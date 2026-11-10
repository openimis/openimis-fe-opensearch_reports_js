import {
  describe, expect, it, vi,
} from 'vitest';

const core = vi.hoisted(() => ({
  graphql: vi.fn((payload, type, meta) => ({ payload, type, meta })),
}));

vi.mock('@openimis/fe-core', async () => ({
  ...(await vi.importActual('@openimis/fe-core/helpers/api')),
  ...core,
}));

const actions = await import('./actions');
const { ACTION_TYPE } = await import('./reducer');
const { ERROR, REQUEST, SUCCESS } = await import('./util/action-type');

const query = (result) => result.payload.replace(/\s+/g, ' ');

describe('opensearch reports actions', () => {
  it('asks for a counted page of dashboards', () => {
    const result = actions.fetchOpenSearchDashboards(['first: 10']);

    expect(result.type).toBe(ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS);
    expect(query(result)).toContain('opensearchDashboard(first: 10) { totalCount');
    expect(query(result)).toContain('edges { node { id,uuid,name,synchDisabled,url,');
  });

  it('asks for a single dashboard without counting', () => {
    const result = actions.fetchOpenSearchDashboard(['name: "Beneficiary"']);

    expect(result.type).toBe(ACTION_TYPE.GET_OPENSEARCH_DASHBOARD);
    expect(query(result)).toContain('opensearchDashboard(name: "Beneficiary")');
    expect(query(result)).not.toContain('totalCount');
  });

  describe('dashboard update', () => {
    const dashboard = {
      id: 'dash-1', name: 'Beneficiary', url: 'goto/abc?security_tenant=private', synchDisabled: false,
    };

    it('sends the edited fields through updateDashboard', () => {
      const sent = query(actions.updateOpenSearchDashboard(dashboard, 'Update Beneficiary'));

      expect(sent).toContain('mutation updateDashboard');
      expect(sent).toContain('clientMutationLabel: "Update Beneficiary"');
      expect(sent).toContain(
        'id: "dash-1" synchDisabled: false name: "Beneficiary" url: "goto/abc?security_tenant=private"',
      );
    });

    it('leaves out the fields it was not given', () => {
      const sent = query(actions.updateOpenSearchDashboard({ synchDisabled: true }, 'Update'));

      expect(sent).toContain('synchDisabled: true');
      expect(sent).not.toMatch(/\b(id|name|url):/);
    });

    it('routes the request and failure through the shared mutation types', () => {
      const result = actions.updateOpenSearchDashboard(dashboard, 'Update Beneficiary');

      expect(result.type).toEqual([
        REQUEST(ACTION_TYPE.MUTATION),
        SUCCESS(ACTION_TYPE.UPDATE_OPENSEARCH_DASHBOARD),
        ERROR(ACTION_TYPE.MUTATION),
      ]);
    });

    it('records the mutation id it sent', () => {
      const result = actions.updateOpenSearchDashboard(dashboard, 'Update Beneficiary');

      expect(result.meta).toMatchObject({
        actionType: ACTION_TYPE.UPDATE_OPENSEARCH_DASHBOARD,
        clientMutationLabel: 'Update Beneficiary',
      });
      expect(result.meta.requestedDateTime).toBeInstanceOf(Date);
      expect(query(result)).toContain(`clientMutationId: "${result.meta.clientMutationId}"`);
    });
  });
});

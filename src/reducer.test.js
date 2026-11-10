import {
  describe, expect, it, vi,
} from 'vitest';

vi.mock('@openimis/fe-core', async () => vi.importActual('@openimis/fe-core/helpers/api'));

const { default: reducer, ACTION_TYPE } = await import('./reducer');
const { ERROR, REQUEST, SUCCESS } = await import('./util/action-type');
const {
  globalId, graphqlErrors, relayPage, serverError,
} = await import('@openimis/fe-core/testing');

const initial = () => reducer(undefined, { type: '@@INIT' });
const dispatch = (state, type, { payload, meta } = {}) => reducer(state, { type, payload, meta });
const respond = (state, actionType, data, extra = {}) => dispatch(
  state,
  SUCCESS(actionType),
  { payload: { data, ...extra } },
);
const fail = (state, actionType, payload = serverError(500, 'Internal Server Error', 'boom')) => dispatch(
  state,
  ERROR(actionType),
  { payload },
);

const SERVER_ERROR = { code: 500, message: 'Internal Server Error', detail: 'boom' };
const page = () => relayPage(
  [
    { id: globalId('OpenSearchDashboardType', 'dash-1'), name: 'Beneficiary', url: 'goto/a' },
    { id: globalId('OpenSearchDashboardType', 'dash-2'), name: 'Grievance', url: 'goto/b' },
  ],
  { totalCount: 7, pageInfo: { hasNextPage: true } },
);

describe('opensearch reports reducer', () => {
  it('starts with nothing loaded and nothing in flight', () => {
    expect(initial()).toMatchObject({
      submittingMutation: false,
      fetchingDashboards: false,
      dashboards: [],
      dashboardsTotalCount: 0,
      fetchingDashboard: false,
      dashboard: null,
    });
  });

  it('returns the same state object for an unrelated action', () => {
    const state = initial();

    expect(reducer(state, { type: 'SOMETHING_ELSE' })).toBe(state);
  });

  describe('dashboard search', () => {
    it('empties the list and clears the error when a search starts', () => {
      const stale = {
        ...initial(), dashboards: [{ id: '1' }], dashboardsTotalCount: 1, errorDashboards: SERVER_ERROR,
      };

      expect(dispatch(stale, REQUEST(ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS))).toMatchObject({
        fetchingDashboards: true,
        fetchedDashboards: false,
        dashboards: [],
        dashboardsPageInfo: {},
        dashboardsTotalCount: 0,
        errorDashboards: null,
      });
    });

    it('decodes the ids and counts the page', () => {
      const state = respond(initial(), ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS, { opensearchDashboard: page() });

      expect(state.fetchingDashboards).toBe(false);
      expect(state.fetchedDashboards).toBe(true);
      expect(state.dashboards.map(({ id }) => id)).toEqual(['dash-1', 'dash-2']);
      expect(state.dashboards[0]).toMatchObject({ name: 'Beneficiary', url: 'goto/a' });
      expect(state.dashboardsTotalCount).toBe(7);
      expect(state.dashboardsPageInfo).toMatchObject({ totalCount: 7, hasNextPage: true });
      expect(state.errorDashboards).toBeNull();
    });

    it('reports an empty page rather than throwing', () => {
      const state = respond(initial(), ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS, { opensearchDashboard: null });

      expect(state.dashboards).toEqual([]);
      expect(state.dashboardsTotalCount).toBeNull();
    });

    it('surfaces a data error', () => {
      const state = respond(
        initial(),
        ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS,
        { opensearchDashboard: relayPage([]) },
        graphqlErrors('bad filter'),
      );

      expect(state.errorDashboards).toMatchObject({ detail: 'bad filter' });
    });

    it('stops fetching on a transport failure', () => {
      expect(fail(initial(), ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS).fetchingDashboards).toBe(false);
    });

    // Currently fails: this branch formats a transport failure as a GraphQL one, and
    // formatGraphQLError returns null for a payload with no errors array.
    it.fails('reports a transport failure of the search', () => {
      expect(fail(initial(), ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS).errorDashboards).toEqual(SERVER_ERROR);
    });
  });

  describe('single dashboard', () => {
    it('forgets the previous dashboard when a load starts', () => {
      const stale = { ...initial(), dashboard: { id: 'dash-1' }, fetchedDashboard: true };

      expect(dispatch(stale, REQUEST(ACTION_TYPE.GET_OPENSEARCH_DASHBOARD))).toMatchObject({
        fetchingDashboard: true,
        fetchedDashboard: false,
        dashboard: null,
      });
    });

    it('keeps the first node, decoded', () => {
      const state = respond(initial(), ACTION_TYPE.GET_OPENSEARCH_DASHBOARD, { opensearchDashboard: page() });

      expect(state.fetchingDashboard).toBe(false);
      expect(state.fetchedDashboard).toBe(true);
      expect(state.dashboard).toEqual({ id: 'dash-1', name: 'Beneficiary', url: 'goto/a' });
    });

    it('leaves the dashboard empty when none matches', () => {
      expect(respond(initial(), ACTION_TYPE.GET_OPENSEARCH_DASHBOARD, { opensearchDashboard: null }).dashboard)
        .toBeUndefined();
    });

    it('formats a transport failure', () => {
      const state = fail(initial(), ACTION_TYPE.GET_OPENSEARCH_DASHBOARD);

      expect(state.fetchingDashboard).toBe(false);
      expect(state.errorDashboard).toEqual(SERVER_ERROR);
    });

    // Currently fails: the success branch sets errorDashboard to null unconditionally,
    // so a data error returned alongside the response is dropped and the page just
    // shows no dashboard.
    it.fails('surfaces a data error', () => {
      const state = respond(
        initial(),
        ACTION_TYPE.GET_OPENSEARCH_DASHBOARD,
        { opensearchDashboard: null },
        graphqlErrors('no such dashboard'),
      );

      expect(state.errorDashboard).toMatchObject({ detail: 'no such dashboard' });
    });
  });

  describe('mutations', () => {
    const submitting = () => dispatch(initial(), REQUEST(ACTION_TYPE.MUTATION), {
      meta: { clientMutationId: 'cmid-1', clientMutationLabel: 'Update dashboard' },
    });

    it('records the request metadata while a mutation is in flight', () => {
      expect(submitting()).toMatchObject({
        submittingMutation: true,
        mutation: { id: 'cmid-1', clientMutationLabel: 'Update dashboard' },
      });
    });

    it('clears the in-flight flag and keeps the internal id of a dashboard update', () => {
      const state = respond(
        submitting(),
        ACTION_TYPE.UPDATE_OPENSEARCH_DASHBOARD,
        { updateDashboard: { internalId: 'internal-1' } },
      );

      expect(state.submittingMutation).toBe(false);
      expect(state.mutation.id).toBe('internal-1');
    });

    it('raises an alert when a mutation fails', () => {
      const state = fail(submitting(), ACTION_TYPE.MUTATION, { status: 500, statusText: 'Internal Server Error' });

      expect(JSON.parse(state.alert)).toEqual({ status: 500, statusText: 'Internal Server Error' });
    });

    // Currently fails: dispatchMutationErr in fe-core only stores the alert, so the
    // module is left believing the mutation is still being submitted.
    it.fails('stops submitting once a mutation has failed', () => {
      expect(fail(submitting(), ACTION_TYPE.MUTATION, { status: 500 }).submittingMutation).toBe(false);
    });
  });
});

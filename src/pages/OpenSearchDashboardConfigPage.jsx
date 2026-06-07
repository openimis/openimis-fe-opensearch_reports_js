// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/material/styles';
import { formatMessage, Helmet, withModulesManager } from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import OpenSearchDashboardTable from '../components/tables/OpenSearchDashboardTable';

const StyledOpenSearchDashboardConfigPage = styled('div')(({ theme }) => ({
  ...(theme?.page ?? {}),
  '& .fab': theme?.fab ?? {},
}));

function OpenSearchDashboardConfigPage(props) {
  const { intl } = props;
  return (
    <StyledOpenSearchDashboardConfigPage>
      <Helmet
        title={formatMessage(
          intl,
          'openSearchReports',
          'openSearch.openSearchConfig',
        )}
      />
      <OpenSearchDashboardTable />
    </StyledOpenSearchDashboardConfigPage>
  );
}

const mapStateToProps = (state) => ({
  rights:
    !!state.core && !!state.core.user && !!state.core.user.i_user
      ? state.core.user.i_user.rights
      : [],
});

export { StyledOpenSearchDashboardConfigPage };
export default injectIntl(
  withModulesManager(connect(mapStateToProps)(OpenSearchDashboardConfigPage)),
);

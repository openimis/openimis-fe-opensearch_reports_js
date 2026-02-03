import React from 'react';
import { Helmet, withModulesManager, formatMessage } from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import OpenSearchDashboardTable from '../components/tables/OpenSearchDashboardTable';

const StyledOpenSearchDashboardConfigPages = styled('div')(({ theme }) => ({
  ...(theme?.page ?? {}),
  '& .fab': theme?.fab ?? {},
}));

function OpenSearchDashboardConfigPage(props) {
  const { intl } = props;
  return (
    <StyledOpenSearchDashboardConfigPage>
      <Helmet title={formatMessage(intl, 'openSearchReports', 'openSearch.openSearchConfig')} />
      <OpenSearchDashboardTable />
    </StyledOpenSearchDashboardConfigPage>
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export { StyledOpenSearchDashboardConfigPage };
export default injectIntl(
  withModulesManager(connect(mapStateToProps)(OpenSearchDashboardConfigPage)),
);

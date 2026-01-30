import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Helmet, withModulesManager, formatMessage } from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { styled } from '@mui/material/styles';
import OpenSearchDashboard from '../components/OpenSearchDashboard';
import { GROUPS_REPORTS } from '../constants';
import { fetchOpenSearchDashboard } from '../actions';

const StyledGroupReportsPages = styled('div')(({ theme }) => ({
  ...theme.page,
  '& .fab': theme.fab,
}));

function GroupReportsPages(props) {
  const { intl } = props;
  const dispatch = useDispatch();
  const {
    dashboard,
  } = useSelector((store) => store.openSearchReports);

  useEffect(() => {
    const params = [`name_Iexact: "${GROUPS_REPORTS}"`];
    dispatch(fetchOpenSearchDashboard(params));
  }, []);

  return (
    <StyledGroupReportsPages>
      <Helmet title={formatMessage(intl, 'openSearchReports', 'openSearch')} />
      <OpenSearchDashboard
        dashboardUrl={dashboard?.url}
      />
    </StyledGroupReportsPages>
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export { StyledGroupReportsPages };
export default injectIntl(
  withModulesManager(connect(mapStateToProps)(GroupReportsPages)),
);

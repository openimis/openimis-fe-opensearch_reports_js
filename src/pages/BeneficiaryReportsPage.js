import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Helmet, withModulesManager, formatMessage } from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import OpenSearchDashboard from '../components/OpenSearchDashboard';
import { BENEFICIARY_REPORTS } from '../constants';
import { fetchOpenSearchDashboard } from '../actions';

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

function BeneficiaryReportsPages(props) {
  const { intl, classes } = props;
  const dispatch = useDispatch();
  const {
    dashboard,
  } = useSelector((store) => store.openSearchReports);

  useEffect(() => {
    const params = [`name_Iexact: "${BENEFICIARY_REPORTS}"`];
    dispatch(fetchOpenSearchDashboard(params));
  }, []);

  return (
    <div className={classes.page}>
      <Helmet title={formatMessage(intl, 'openSearchReports', 'openSearch')} />
      <OpenSearchDashboard
        dashboardUrl={dashboard?.url}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(
  withModulesManager(withTheme(withStyles(styles)(connect(mapStateToProps)(BeneficiaryReportsPages)))),
);

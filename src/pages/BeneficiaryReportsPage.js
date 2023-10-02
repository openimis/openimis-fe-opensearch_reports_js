import React from 'react';
import { Helmet, withModulesManager, formatMessage } from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import OpenSearchDashboard from '../components/OpenSearchDashboard';

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

function BeneficiaryReportsPages(props) {
  const { intl, classes } = props;
  return (
    <div className={classes.page}>
      <Helmet title={formatMessage(intl, 'openSearchReports', 'openSearch')} />
      <OpenSearchDashboard
        dashboardUrl="goto/f36ce4c256637ca76cc31db315696e5a?security_tenant=private"
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

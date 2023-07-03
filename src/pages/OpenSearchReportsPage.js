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

function OpenSearchReportsPages(props) {
  const { intl, classes } = props;

  return (
    <div className={classes.page}>
      <Helmet title={formatMessage(intl, 'openSearchReports', 'openSearch')} />
      <OpenSearchDashboard />
    </div>
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(
  withModulesManager(withTheme(withStyles(styles)(connect(mapStateToProps)(OpenSearchReportsPages)))),
);

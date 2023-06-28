/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { connect } from 'react-redux';
import { Tune } from '@material-ui/icons';
import { formatMessage, MainMenuContribution, withModulesManager } from '@openimis/fe-core';
import { OPENSEARCH_REPORTS_MAIN_MENU_CONTRIBUTION_KEY } from '../constants';

function OpenSearchReportsMenu(props) {
  const entries = [
    {
      text: 'openSearch reports',
      icon: <Tune />,
      route: '/openSearchReports',
    },
  ];
  entries.push(
    ...props.modulesManager
      .getContribs(OPENSEARCH_REPORTS_MAIN_MENU_CONTRIBUTION_KEY)
  );

  return (
    <MainMenuContribution
      {...props}
      header={'openSearch reports'}
      entries={entries}
    />
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default withModulesManager(connect(mapStateToProps)(OpenSearchReportsMenu));

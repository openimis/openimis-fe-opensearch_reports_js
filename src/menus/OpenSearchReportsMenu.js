/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Tune } from '@material-ui/icons';
import { formatMessage, MainMenuContribution, withModulesManager } from '@openimis/fe-core';
import { OPENSEARCH_REPORTS_MAIN_MENU_CONTRIBUTION_KEY } from '../constants';

function OpenSearchReportsMenu(props) {
  const entries = [
    {
      text: formatMessage(props.intl, 'openSearchReports', 'openSearch'),
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
      header={formatMessage(props.intl, 'openSearchReports', 'openSearch')}
      entries={entries}
    />
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(withModulesManager(connect(mapStateToProps)(OpenSearchReportsMenu)));

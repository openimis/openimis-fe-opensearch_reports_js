/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  formatMessage,
  MainMenuContribution,
  withModulesManager,
  GetIconComponent,
} from '@openimis/fe-core';
import { OPENSEARCH_REPORTS_MAIN_MENU_CONTRIBUTION_KEY } from '../constants';
const DashboardIcon = GetIconComponent("Dashboard");
function OpenSearchReportsMenu(props) {

  return (
    <MainMenuContribution
      {...props}
      header={formatMessage(props.intl, 'openSearchReports', 'openSearch')}
      menuId="OpenSearchReportsMenu"
      contributionKey={OPENSEARCH_REPORTS_MAIN_MENU_CONTRIBUTION_KEY}
      icon={<DashboardIcon />}
    />
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export { OpenSearchReportsMenu };
export default injectIntl(withModulesManager(connect(mapStateToProps)(OpenSearchReportsMenu)));

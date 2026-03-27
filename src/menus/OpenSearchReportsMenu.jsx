/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Tune from '@mui/icons-material/Tune';
import DoubleArrow from '@mui/icons-material/DoubleArrow';
import Person from '@mui/icons-material/Person';
import People from '@mui/icons-material/People';
import Update from '@mui/icons-material/Update';
import PaymentIcon from '@mui/icons-material/Payment';
import ToolIcon from '@mui/icons-material/Build';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  formatMessage,
  MainMenuContribution,
  withModulesManager,
} from '@openimis/fe-core';
import { OPENSEARCH_REPORTS_MAIN_MENU_CONTRIBUTION_KEY } from '../constants';

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

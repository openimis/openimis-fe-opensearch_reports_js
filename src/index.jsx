/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Tune from '@mui/icons-material/Tune';
import DoubleArrow from '@mui/icons-material/DoubleArrow';
import Person from '@mui/icons-material/Person';
import People from '@mui/icons-material/People';
import Update from '@mui/icons-material/Update';
import PaymentIcon from '@mui/icons-material/Payment';
import ToolIcon from '@mui/icons-material/Build';
import { FormattedMessage } from '@openimis/fe-core';
import messagesEn from './translations/en.json';
import BeneficiaryReportsPage from './pages/BeneficiaryReportsPage';
import GrievanceReportsPage from './pages/GrievanceReportsPage';
import InvoiceReportsPage from './pages/InvoiceReportsPage';
import PaymentReportsPage from './pages/PaymentReportsPage';
import OpenSearchReportsMenu from './menus/OpenSearchReportsMenu';
import OpenSearchDashboardConfigPage from './pages/OpenSearchDashboardConfigPage';
import reducer from './reducer';
import IndividualReportsPage from './pages/IndividualReportsPage';
import GroupReportsPage from './pages/GroupReportsPage';
import DataUpdatesReportsPage from './pages/DataUpdatesReportsPage';

const DEFAULT_CONFIG = {
  translations: [{ key: 'en', messages: messagesEn }],
  reducers: [{ key: 'openSearchReports', reducer }],
  'core.MainMenu': [{ name: 'OpenSearchReportsMenu', component: OpenSearchReportsMenu }],
  'core.Router': [
    { path: 'individualReports', component: IndividualReportsPage },
    { path: 'groupReports', component: GroupReportsPage },
    { path: 'beneficiaryReports', component: BeneficiaryReportsPage },
    { path: 'invoiceReports', component: InvoiceReportsPage },
    { path: 'grievanceReports', component: GrievanceReportsPage },
    { path: 'dataUpdatesReports', component: DataUpdatesReportsPage },
    { path: 'paymentReports', component: PaymentReportsPage },
    { path: 'dashboardConfiguration', component: OpenSearchDashboardConfigPage },
  ],
  'OpenSearch.MainMenu': [
    {
      text: <FormattedMessage module="openSearchReports" id="openSearch.individualReports" />,
      icon: <Person />,
      route: '/individualReports',
      id: 'openSearch.individualReports',
    },
    {
      text: <FormattedMessage module="openSearchReports" id="openSearch.groupReports" />,
      icon: <People />,
      route: '/groupReports',
      id: 'openSearch.groupReports',
    },
    {
      text: <FormattedMessage module="openSearchReports" id="openSearch.beneficiaryReports" />,
      icon: <Person />,
      route: '/beneficiaryReports',
      id: 'openSearch.beneficiaryReports',
    },
    {
      text: <FormattedMessage module="openSearchReports" id="openSearch.invoiceReports" />,
      icon: <DoubleArrow />,
      route: '/invoiceReports',
      id: 'openSearch.invoiceReports',
    },
    {
      text: <FormattedMessage module="openSearchReports" id="openSearch.paymentReports" />,
      icon: <PaymentIcon />,
      route: '/paymentReports',
      id: 'openSearch.paymentReports',
    },
    {
      text: <FormattedMessage module="openSearchReports" id="openSearch.grievanceReports" />,
      icon: <Tune />,
      route: '/grievanceReports',
      id: 'openSearch.grievanceReports',
    },
    {
      text: <FormattedMessage module="openSearchReports" id="openSearch.dataUpdatesReports" />,
      icon: <Update />,
      route: '/dataUpdatesReports',
      id: 'openSearch.dataUpdatesReports',
    },
    {
      text: <FormattedMessage module="openSearchReports" id="openSearch.openSearchConfig" />,
      icon: <ToolIcon />,
      route: '/dashboardConfiguration',
      id: 'openSearch.openSearchConfig',
    },
  ],
};

/* eslint-disable */
export const OpenSearchReportsModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });

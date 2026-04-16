/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import messagesEn from './translations/en.json';
import BeneficiaryReportsPage from './pages/BeneficiaryReportsPage';
import GrievanceReportsPage from './pages/GrievanceReportsPage';
import InvoiceReportsPage from './pages/InvoiceReportsPage';
import PaymentReportsPage from './pages/PaymentReportsPage';
import OpenSearchDashboardConfigPage from './pages/OpenSearchDashboardConfigPage';
import reducer from './reducer';
import IndividualReportsPage from './pages/IndividualReportsPage';
import GroupReportsPage from './pages/GroupReportsPage';
import DataUpdatesReportsPage from './pages/DataUpdatesReportsPage';
import {RIGHT_OPENSEARCH_DASHBOARD_UPDATE, RIGHT_OPENSEARCH_DASHBOARD} from "./constants"

const DEFAULT_CONFIG = {
  translations: [{ key: 'en', messages: messagesEn }],
  reducers: [{ key: 'openSearchReports', reducer }],
  'core.MainMenu': [{ name: 'OpenSearchReportsMenu', id:"OpenSearch.MainMenu", text:"openSearchReports.openSearch", icon: "DashboardIcon" }],
  'core.Router': [
    { 
      path: 'individualReports',
      text: "openSearchReports.openSearch.individualReports",
      id: 'openSearch.individualReports',
      component: IndividualReportsPage,
      rights: [RIGHT_OPENSEARCH_DASHBOARD],
      icon: "Person"
    },
    { 
      path: 'groupReports',
      text: "openSearchReports.openSearch.groupReports",
      id: 'openSearch.groupReports',
      component: GroupReportsPage,
      rights: [RIGHT_OPENSEARCH_DASHBOARD],
      icon: "People" 
    },
    { 
      path: 'beneficiaryReports',
      text: "openSearchReports.openSearch.beneficiaryReports",
      id: 'openSearch.beneficiaryReports',
      component: BeneficiaryReportsPage,
      rights: [RIGHT_OPENSEARCH_DASHBOARD],
      icon: "Person"
    },
    { 
      path: 'invoiceReports',
      text: "openSearchReports.openSearch.invoiceReports",
      id: 'openSearch.invoiceReports',
      component: InvoiceReportsPage,
      rights: [RIGHT_OPENSEARCH_DASHBOARD],
      icon: "DoubleArrow"
    },
    { 
      path: 'grievanceReports',
      id: 'openSearch.grievanceReports',
      component: GrievanceReportsPage,
      rights: [RIGHT_OPENSEARCH_DASHBOARD],
      icon: "Tune",
      text: "openSearchReports.openSearch.grievanceReports",
    },
    { 
      path: 'dataUpdatesReports',
      id: 'openSearch.dataUpdatesReports',
      component: DataUpdatesReportsPage,
      rights: [RIGHT_OPENSEARCH_DASHBOARD],
      text: "openSearchReports.openSearch.dataUpdatesReports",
      icon: "Update"
    },
    { 
      path: 'paymentReports',
      text: "openSearchReports.openSearch.paymentReports",
      id: 'openSearch.paymentReports',
      component: PaymentReportsPage,
      rights: [RIGHT_OPENSEARCH_DASHBOARD],
      icon: "Payment"
    },
    { 
      path: 'dashboardConfiguration',
      id: 'openSearch.openSearchConfig',
      component: OpenSearchDashboardConfigPage,
      rights: [RIGHT_OPENSEARCH_DASHBOARD_UPDATE],
      text: "openSearchReports.openSearch.openSearchConfig",
      icon: "Settings"
    },
  ],
  'OpenSearch.MainMenu': [
    {
      route: 'individualReports',
    },
    {
      route: 'groupReports',
    },
    {
      route: 'beneficiaryReports',
    },
    {
      route: 'invoiceReports',
    },
    {
      route: 'paymentReports',
    },
    {
      route: 'grievanceReports',
    },
    {
      route: 'dataUpdatesReports',
    },
    {
      route: 'dashboardConfiguration',
    },
  ],
};

/* eslint-disable */
export const OpenSearchReportsModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });

/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { GetIconComponent } from "@openimis/fe-core";
const Tune = GetIconComponent("Tune")
const DoubleArrow = GetIconComponent("DoubleArrow")
const Person = GetIconComponent("Person")
const People = GetIconComponent("People")
const Update = GetIconComponent("Update")
const PaymentIcon = GetIconComponent("PaymentIcon")
const ToolIcon = GetIconComponent("Build")

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
    { path: 'individualReports', component: IndividualReportsPage, rights: ['openSearchReports.view'], icon: Person },
    { path: 'groupReports', component: GroupReportsPage, rights: ['openSearchReports.view'], icon: People },
    { path: 'beneficiaryReports', component: BeneficiaryReportsPage, rights: ['openSearchReports.view'], icon: Person },
    { path: 'invoiceReports', component: InvoiceReportsPage, rights: ['openSearchReports.view'], icon: DoubleArrow },
    { path: 'grievanceReports', component: GrievanceReportsPage, rights: ['openSearchReports.view'], icon: Tune },
    { path: 'dataUpdatesReports', component: DataUpdatesReportsPage, rights: ['openSearchReports.view'], icon: Update },
    { path: 'paymentReports', component: PaymentReportsPage, rights: ['openSearchReports.view'], icon: PaymentIcon },
    { path: 'dashboardConfiguration', component: OpenSearchDashboardConfigPage, rights: ['openSearchReports.view'], icon: ToolIcon },
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

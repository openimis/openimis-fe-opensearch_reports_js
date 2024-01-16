import messagesEn from './translations/en.json';
import BeneficiaryReportsPage from './pages/BeneficiaryReportsPage';
import GrievanceReportsPage from './pages/GrievanceReportsPage';
import InvoiceReportsPage from './pages/InvoiceReportsPage';
import PaymentReportsPage from './pages/PaymentReportsPage';
import OpenSearchReportsMenu from './menus/OpenSearchReportsMenu';
import OpenSearchDashboardConfigPage from './pages/OpenSearchDashboardConfigPage';
import reducer from './reducer';

const DEFAULT_CONFIG = {
  translations: [{ key: 'en', messages: messagesEn }],
  reducers: [{ key: 'openSearchReports', reducer }],
  'core.MainMenu': [OpenSearchReportsMenu],
  'core.Router': [
    { path: 'beneficiaryReports', component: BeneficiaryReportsPage },
    { path: 'invoiceReports', component: InvoiceReportsPage },
    { path: 'grievanceReports', component: GrievanceReportsPage },
    { path: 'paymentReports', component: PaymentReportsPage },
    { path: 'dashboardConfiguration', component: OpenSearchDashboardConfigPage },
  ],
};

/* eslint-disable */
export const OpenSearchReportsModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });

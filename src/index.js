import messagesEn from './translations/en.json';
import BeneficiaryReportsPage from './pages/BeneficiaryReportsPage';
import GrievanceReportsPage from './pages/GrievanceReportsPage';
import InvoiceReportsPage from './pages/InvoiceReportsPage';
import PaymentReportsPage from './pages/PaymentReportsPage';
import OpenSearchReportsMenu from './menus/OpenSearchReportsMenu';

const DEFAULT_CONFIG = {
  translations: [{ key: 'en', messages: messagesEn }],
  'core.MainMenu': [OpenSearchReportsMenu],
  'core.Router': [
    { path: 'beneficiaryReports', component: BeneficiaryReportsPage },
    { path: 'invoiceReports', component: InvoiceReportsPage },
    { path: 'grievanceReports', component: GrievanceReportsPage },
    { path: 'paymentReports', component: PaymentReportsPage },
  ],
};

/* eslint-disable */
export const OpenSearchReportsModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });

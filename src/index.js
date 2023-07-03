import messagesEn from './translations/en.json';
import OpenSearchReportsPage from './pages/OpenSearchReportsPage';
import OpenSearchReportsMenu from './menus/OpenSearchReportsMenu';

const DEFAULT_CONFIG = {
  translations: [{ key: 'en', messages: messagesEn }],
  'core.MainMenu': [OpenSearchReportsMenu],
  "core.Router": [
      { path: 'openSearchReports', component: OpenSearchReportsPage }
  ],
};

// Disable due to core architecture - Prefer default export on a file with single export
export const OpenSearchReportsModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });

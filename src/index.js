import messagesEn from './translations/en.json';
import OpenSearchReportsPage from './pages/OpenSearchReportsPage';
import OpenSearchReportsMenu from './menus/OpenSearchReportsMenu';
import { Ballot } from "@material-ui/icons";
import { FormattedMessage } from "@openimis/fe-core";

console.log('xsa');

const DEFAULT_CONFIG = {
  translations: [{ key: 'en', messages: messagesEn }],
  'core.MainMenu': [OpenSearchReportsMenu],
  "core.Router": [
      { path: 'openSearchReports', component: OpenSearchReportsPage }
  ],
};

console.log('xsa');

// Disable due to core architecture - Prefer default export on a file with single export
export const OpenSearchReportsModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });

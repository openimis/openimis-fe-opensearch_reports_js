import messagesEn from './translations/en.json';

const DEFAULT_CONFIG = {
  translations: [{ key: 'en', messages: messagesEn }],
};

// Disable due to core architecture - Prefer default export on a file with single export
/* eslint-disable */
export const OpensearchReportsModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });

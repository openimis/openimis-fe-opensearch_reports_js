import messagesEn from './translations/en.json';

const DEFAULT_CONFIG = {
  'translations': [{ key: 'en', messages: messagesEn }],
};

export const OpensearchReportsModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });

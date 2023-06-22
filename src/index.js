import messagesEn from './translations/en.json';

const DEFAULT_CONFIG = {
  translations: [{ key: 'en', messages: messagesEn }],
};

const OpensearchReportsModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });

export default OpensearchReportsModule;

import React from 'react';

/* eslint-disable */
function OpenSearchDashboard(dashboardUrl) {
  const currentHostname = window.location.hostname;
  const openSearchBaseRootPath = process.env.OPENSEARCH_PROXY_ROOT ?? 'opensearch';

  return (
    <iframe
      src={`https://${currentHostname}/${openSearchBaseRootPath}/${dashboardUrl}`}
      title="OpenSearch Dashboard" // Add a unique title property
      style={{ position: 'absolute', width: '80%', height: '90%' }}
      allow="same-origin allow-scripts"
    />
  );
};

export default OpenSearchDashboard;

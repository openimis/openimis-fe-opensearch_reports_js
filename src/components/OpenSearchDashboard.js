import React from 'react';

/* eslint-disable */
function OpenSearchDashboard() {
  const currentHostname = window.location.hostname;
  const openSearchBaseRootPath = process.env.OPENSEARCH_PROXY_ROOT ?? 'opensearch';

  return (
    <iframe
      src={`https://${currentHostname}/${openSearchBaseRootPath}/`}
      title="OpenSearch Dashboard" // Add a unique title property
      style={{ position: 'absolute', width: '95%', height: '90%' }}
      allow="same-origin allow-scripts"
    />
  );
};

export default OpenSearchDashboard;

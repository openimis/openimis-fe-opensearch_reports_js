/* eslint-disable */
import React from 'react';

function OpenSearchDashboard(props) {
  const openSearchBaseRootPath = (process.env.OPENSEARCH_PROXY_ROOT || 'opensearch').replace(/^\/+/, '');
  const dashboardUrl = props.dashboardUrl;
  return (
    <iframe
      src={`/${openSearchBaseRootPath}/${dashboardUrl}`}
      title="OpenSearch Dashboard" // Add a unique title property
      style={{ position: 'absolute', width: '80%', height: '90%' }}
      allow="same-origin allow-scripts"
    />
  );
};

export default OpenSearchDashboard;

import React from 'react';

const OpenSearchDashboard = () => {
  
  const proxyHost = process.env.PROXY_HOST ?? '172.20.20.13';
  const openSearchBaseRootPath = process.env.OPENSEARCH_PROXY_ROOT ?? 'opensearch';

  return (
    <iframe 
      src={`https://${proxyHost}/${openSearchBaseRootPath}/`} 
      style={{position: 'absolute', width: "95%", height: "90%"}}
      allow="same-origin allow-scripts"
    />
  );
};

export default OpenSearchDashboard;

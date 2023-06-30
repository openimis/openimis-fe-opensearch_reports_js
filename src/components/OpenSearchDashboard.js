import React from 'react';

const OpenSearchDashboard = () => {
  
  return (
    <iframe 
      src="http://172.20.20.13/opensearch/" 
      style={{position: 'absolute', width: "95%", height: "90%"}}
      allow="same-origin allow-scripts"
    />
  );
};

export default OpenSearchDashboard;

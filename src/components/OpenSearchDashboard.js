import React from 'react';
import Cookies from 'js-cookie';


const OpenSearchDashboard = () => {
  
  return (
    <iframe 
      src="http://172.20.20.98/app/home#/)" 
      style={{position: 'absolute', width: "95%", height: "90%"}}
      allow="same-origin allow-scripts"
    />
  );
};

export default OpenSearchDashboard;

import React from 'react';

function Loader({ isLoading }) {
  return (
  <>
    <div className={isLoading ? 'loader__fixed' :  'loader__fixed loader__fixed_disable'}>
      <div className="loader">Loading...</div>
    </div>
  </>
  );
}

export default Loader;
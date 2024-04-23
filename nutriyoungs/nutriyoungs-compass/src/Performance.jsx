import React from 'react';

function PerformanceOverview() {
  return (
    <div>
      <h2>Performance Overview</h2>
      {/* You would have your cards for performance data here */}
      {/* For example: */}
      <div className="card">
        <span>Total Revenue</span>
        <h3>$125,24</h3>
      </div>
      <div className="card">
        <span>Total Item Orders</span>
        <h3>20,234</h3>
      </div>
    </div>
  );
}

export default PerformanceOverview;

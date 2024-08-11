import React from 'react';
import PropTypes from 'prop-types';

const Overview = ({ data, selectedDatasets, selectedDataPoint }) => {
  // Calculate summary
  const calculateSummary = () => {
    let totalCompanies = 0;
    let activeStatusCount = 0;
    let totalPerformance = 0;

    selectedDatasets.forEach((dataset) => {
      const datasetData = data[dataset] || [];
      totalCompanies += datasetData.length;
      activeStatusCount += datasetData.filter(item => item.status === 'Active').length;
      totalPerformance += datasetData.reduce((sum, item) => sum + (item.performance || 0), 0);
    });

    return { totalCompanies, activeStatusCount, totalPerformance };
  };

  const summary = calculateSummary();

  return (
    <div className="overview">
      <div className="card">
        <h3>Total Companies</h3>
        <p>{summary.totalCompanies.toLocaleString()}</p>
        <small>Based on selected datasets</small>
      </div>
      <div className="card">
        <h3>Active Status Count</h3>
        <p>{summary.activeStatusCount.toLocaleString()}</p>
        <small>Based on selected datasets</small>
      </div>
      <div className="card">
        <h3>Total Performance</h3>
        <p>{summary.totalPerformance.toLocaleString()}</p>
      </div>
    </div>
  );
};

Overview.propTypes = {
  data: PropTypes.object.isRequired,
  selectedDatasets: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDataPoint: PropTypes.string,
};

export default Overview;

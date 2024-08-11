import React, { useState } from "react";
import PropTypes from "prop-types";

const VendorTable = ({
  data,
  toggleDataset,
  selectedDatasets,
  handleDataPointClick,
  selectedDataPoint,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dataPoints = Object.keys(data);

  // Filter data points based on search query
  const filteredDataPoints = dataPoints.filter((dataPoint) =>
    dataPoint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      filteredDataPoints.forEach((dataPoint) => {
        if (!selectedDatasets.includes(dataPoint)) {
          toggleDataset(dataPoint);
        }
      });
    } else {
      filteredDataPoints.forEach((dataPoint) => {
        if (selectedDatasets.includes(dataPoint)) {
          toggleDataset(dataPoint);
        }
      });
    }
  };

  const handleCheckboxChange = (dataPoint) => {
    toggleDataset(dataPoint);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="vendor-table">
      <h2>Companies Activity History</h2>
      <div className="search-container">
        {/* <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        /> */}

        <div class="container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div class="search"></div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Company Name</th>
            <th>Performance</th>
            <th>Description</th>
            <th>Last Checked</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="table-list">
          {filteredDataPoints.map((dataPoint, index) => (
            <tr
              key={index}
              onClick={() => handleDataPointClick(dataPoint)} // Handle row click
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedDatasets.includes(dataPoint)}
                  onChange={() => handleCheckboxChange(dataPoint)}
                />
              </td>
              <td>{data[dataPoint]?.companyName || `Company ${index + 1}`}</td>
              <td>
                {data[dataPoint]?.performance || `${Math.random() * 100}%`}
              </td>
              <td>{data[dataPoint]?.description || dataPoint}</td>
              <td>
                {data[dataPoint]?.lastChecked ||
                  new Date().toLocaleDateString()}
              </td>
              <td>{data[dataPoint]?.status || "Active66"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDataPoint && (
        <div className="filter-summary">
          <h3>Filtered Data: </h3>
          <h6>{selectedDataPoint}</h6>
          <ul>
            {data[selectedDataPoint]?.map((value, index) => (
              <li key={index}>{`Point ${index + 1}: ${value}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

VendorTable.propTypes = {
  data: PropTypes.object.isRequired,
  toggleDataset: PropTypes.func.isRequired,
  selectedDatasets: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDataPointClick: PropTypes.func.isRequired,
  selectedDataPoint: PropTypes.string,
};

export default VendorTable;

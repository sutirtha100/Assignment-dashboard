import React, { useState, useEffect } from "react";
import axios from "axios";
import Overview from "../Components/Overview";
import VendorTable from "../Components/VendorTable";
import Graph from "../Components/Graph";
import Navbar from "../Components/Navbar";

function Home() {
  const [data, setData] = useState({});
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [selectedDataPoint, setSelectedDataPoint] = useState('');

  useEffect(() => {
    axios
      .get("https://demo-backend.durbin.co.in/get-all-matix-data")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleDataset = (dataset) => {
    setSelectedDatasets((prevDatasets) => {
      if (prevDatasets.includes(dataset)) {
        return prevDatasets.filter((item) => item !== dataset);
      } else {
        return [...prevDatasets, dataset];
      }
    });
  };

  const handleDataPointClick = (dataPoint) => {
    setSelectedDataPoint(dataPoint);
  };

  return (
    <>
      <div className="App">
        <Navbar />
        <div className="all-graph-section">
          <Overview 
            data={data} 
            selectedDatasets={selectedDatasets} 
            selectedDataPoint={selectedDataPoint} 
          />
          <Graph data={data} selectedDatasets={selectedDatasets} />
          <VendorTable
            data={data}
            toggleDataset={toggleDataset}
            selectedDatasets={selectedDatasets}
            handleDataPointClick={handleDataPointClick}
            selectedDataPoint={selectedDataPoint}
          />
        </div>
      </div>
    </>
  );
}

export default Home;

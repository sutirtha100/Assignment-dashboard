import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#d88484', '#84d8d8', '#d8a684', '#84d888'];

const Graph = ({ data, selectedDatasets }) => {
  const formatData = () => {
    const formattedData = [];

    if (selectedDatasets.length === 0) {
      return formattedData;
    }

    const length = data[selectedDatasets[0]] ? data[selectedDatasets[0]].length : 0;

    for (let i = 0; i < length; i++) {
      let entry = { name: `Point ${i + 1}` };
      selectedDatasets.forEach((dataset) => {
        entry[dataset] = data[dataset] ? data[dataset][i] : null;
      });
      formattedData.push(entry);
    }

    return formattedData;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formatData()}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333333" enableBackground="#000" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedDatasets.map((dataset, index) => (
          <Line key={dataset} type="monotone" dataKey={dataset} stroke={colors[index % colors.length]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;

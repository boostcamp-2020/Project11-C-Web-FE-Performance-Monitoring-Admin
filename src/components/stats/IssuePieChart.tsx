import React, { useEffect, useRef } from 'react';
import bb, { pie } from 'billboard.js';

const IssuePieChart = ({ issueData }) => {
  const issuePieChartDiv = useRef(null);

  useEffect(() => {
    if (issueData) {
      const columns = [];
      const types = {};

      issueData.forEach(item => {
        columns.push(item.value);
        types[item.name] = pie();
      });

      bb.generate({
        data: {
          columns,
          types,
        },
        bindto: issuePieChartDiv.current,
      });
    }
  }, [issueData]);

  return <div ref={issuePieChartDiv} />;
};

export default IssuePieChart;

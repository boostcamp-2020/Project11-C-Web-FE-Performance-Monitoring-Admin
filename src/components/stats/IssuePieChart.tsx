import React, { useEffect, useRef } from 'react';
import bb, { pie, donut } from 'billboard.js';

const IssuePieChart = ({ issueData }) => {
  const issuePieChartDiv = useRef(null);

  useEffect(() => {
    if (issueData) {
      const columns = [];

      issueData.forEach(item => {
        columns.push(item.value);
      });

      bb.generate({
        data: {
          columns,
          type: donut(),
        },
        donut: {
          width: 15,
          padAngle: 0.05,
        },
        bindto: issuePieChartDiv.current,
      });
    }
  }, [issueData]);

  return <div ref={issuePieChartDiv} />;
};

export default IssuePieChart;

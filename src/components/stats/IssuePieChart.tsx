import React from 'react';
import { VictoryPie } from 'victory';

const IssuePieChart = ({ issueData }) => {
  const columns = [];
  const colors = {
    default: ['#1b7df7', '#fe3632', '#51d569', '#fa8e1b', '#1bf3fa'],
    teal: ['#49C6B7', '#5E6063'],
  };

  let total: number = 0;
  if (issueData) {
    issueData.forEach(item => {
      columns.push({ x: item.value[0], y: item.value[1] });
      total = total + item.value[1];
    });
  }

  if (columns.length < 1) {
    return null;
  }

  columns.forEach(column => {
    column.y = (column.y / total) * 100;
  });

  return (
    <div>
      <VictoryPie
        padding={100}
        data={columns}
        style={{
          labels: {
            fill: 'white',
            fontSize: 11,
          },
        }}
        colorScale={colors.default}
        innerRadius={130}
      />
    </div>
  );
};

export default IssuePieChart;

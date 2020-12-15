import React, { useEffect, useRef } from 'react';
import bb, { bar } from 'billboard.js';

const TagBarChart = ({ tagData }) => {
  const tagBarChartDiv = useRef(null);

  useEffect(() => {
    if (tagData) {
      const columns = [];
      const types = {};
      const groups = [];

      tagData.forEach(item => {
        columns.push(item.value);
        types[item.name] = bar();
        groups.push(item.name);
      });

      bb.generate({
        data: {
          columns,
          types,
          groups: [groups],
          stack: {
            normalize: true,
          },
        },
        axis: {
          rotated: true,
          x: {
            show: false,
          },
          y: {
            show: false,
          },
        },
        bindto: tagBarChartDiv.current,
      });
    }
  }, [tagData]);

  return <div ref={tagBarChartDiv} />;
};

export default TagBarChart;

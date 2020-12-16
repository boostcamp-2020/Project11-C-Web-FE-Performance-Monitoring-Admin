import React, { useEffect, useRef } from 'react';
import bb, { bar } from 'billboard.js';
import styled from 'styled-components';

const ChartDiv = styled.div`
  height: 5rem;
`;

const TagBarChart = ({ tagName, tagData }) => {
  const tagBarChartDiv = useRef(null);

  useEffect(() => {
    if (tagData) {
      const columns = [];
      const types = {};
      const groups = [];

      columns.push(['x', tagName]);
      tagData.forEach(item => {
        columns.push(item.value);
        types[item.name] = bar();
        groups.push(item.name);
      });

      bb.generate({
        data: {
          x: 'x',
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
            type: 'category',
            show: false,
          },
          y: {
            show: false,
          },
        },
        bar: { width: 15 },
        bindto: tagBarChartDiv.current,
      });
    }
  }, [tagData]);

  return <ChartDiv ref={tagBarChartDiv} />;
};

export default TagBarChart;

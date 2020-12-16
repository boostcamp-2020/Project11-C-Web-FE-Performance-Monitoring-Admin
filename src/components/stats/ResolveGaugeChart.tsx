import React, { useEffect, useRef } from 'react';
import bb, { gauge } from 'billboard.js';
import styled from 'styled-components';
import { VictoryPie } from 'victory';

const ChartDiv = styled.div`
  width: 20rem;
  height: 20rem;
`;

const ResolveGaugeChart = ({ rateData, name }) => {
  const resolveGaugeChartDiv = useRef(null);

  const columns = [];
  if (rateData) {
    const resolvedRate =
      (rateData.true / (rateData.true + rateData.false)) * 100;
    columns.push({ x: 'Unresolved', y: 100 - resolvedRate });
    columns.push({
      x: name,
      y: resolvedRate,
    });
  }

  return (
    <VictoryPie
      startAngle={90}
      endAngle={-90}
      data={columns}
      style={{
        labels: {
          fill: 'white',
          fontSize: 11,
        },
      }}
      colorScale={['#fa221b', '#1b7dfa']}
      innerRadius={130}
    />
  );
};

export default ResolveGaugeChart;

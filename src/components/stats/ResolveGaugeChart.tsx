import React, { useEffect, useRef } from 'react';
import bb, { gauge } from 'billboard.js';
import styled from 'styled-components';

const ChartDiv = styled.div`
  width: 20rem;
  height: 20rem;
`;

const ResolveGaugeChart = ({ rateData, name }) => {
  const resolveGaugeChartDiv = useRef(null);

  useEffect(() => {
    if (rateData) {
      const columns = [
        [name, (rateData.true / (rateData.true + rateData.false)) * 100],
      ];

      bb.generate({
        data: {
          columns,
          type: gauge(),
        },
        color: {
          pattern: ['#FE2E2E', '#FE9A2E', '#31B404', '#045FB4'],
          threshold: { values: [25, 50, 75, 100] },
        },
        gauge: {
          background: 'grey',
          width: 15,
        },
        bindto: resolveGaugeChartDiv.current,
      });
    }
  }, [rateData, name]);

  return <ChartDiv ref={resolveGaugeChartDiv} />;
};

export default ResolveGaugeChart;

import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { LineChartData } from '../../types/index';
import { CHART_THEME } from '../../constants';

interface Props {
    data: LineChartData[]
}

const LineChart: React.FC<Props> = ({ data }) => {

    return (
        <ResponsiveLine
            data={data}
            theme={CHART_THEME}
            colors={{ "scheme": "category10" }}
            margin={{ top: 30, right: 20, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            yFormat=" >-.2~f"
            lineWidth={4}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 6,
                tickPadding: 5,
                tickRotation: -45,
                legend: 'Months',
                legendOffset: 40,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Euros',
                legendOffset: -50,
                legendPosition: 'middle'
            }}
            pointSize={6}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'top-right',
                    direction: 'column',
                    justify: false,
                    translateX: 35,
                    translateY: -25,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
}

export default LineChart;
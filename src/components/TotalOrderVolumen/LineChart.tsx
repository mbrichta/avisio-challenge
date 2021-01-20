import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { LineChartData } from '../../types/index';

interface Props {
    data: LineChartData[]
}

const LineChart: React.FC<Props> = ({ data }) => {

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
            xScale={{ type: 'linear' }}
            yScale={{ type: 'linear' }}
            curve="linear"
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: 36,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: '.2s',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enableGridX={true}
            enableGridY={true}
            colors={{ scheme: 'spectral' }}
            lineWidth={3}
            pointSize={8}
            pointColor={{ from: 'color', modifiers: [] }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 140,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 12,
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
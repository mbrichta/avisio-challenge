import React from 'react';
import { ResponsivePie } from '@nivo/pie'
import { PieChartData } from '../../types';
import { CHART_THEME } from '../../constants';

interface Props {
    data: PieChartData[]
    filter: string
}

const PieChart: React.FC<Props> = ({ data, filter }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 35, right: 5, bottom: 75, left: 5 }}
        innerRadius={0.3}
        cornerRadius={3}
        enableRadialLabels={false}
        colors={{ scheme: 'category10' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabel={d => filter === "Currency" ? `${d.value}€` : d.value}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="inherit:darker(1.6)"
        theme={CHART_THEME}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 30,
                itemWidth: 60,
                itemHeight: 30,
                itemTextColor: '#999',
                itemDirection: 'top-to-bottom',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)


export default PieChart;
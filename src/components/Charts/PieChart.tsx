import React from 'react';
import { ResponsivePie } from '@nivo/pie'

const data = [
    {
        "id": "rust",
        "label": "rust",
        "value": 474,
        "color": "hsl(199, 70%, 50%)"
    },
    {
        "id": "elixir",
        "label": "elixir",
        "value": 59,
        "color": "hsl(268, 70%, 50%)"
    },
    {
        "id": "go",
        "label": "go",
        "value": 29,
        "color": "hsl(48, 70%, 50%)"
    },
    {
        "id": "c",
        "label": "c",
        "value": 422,
        "color": "hsl(232, 70%, 50%)"
    },
    {
        "id": "hack",
        "label": "hack",
        "value": 304,
        "color": "hsl(145, 70%, 50%)"
    }
]

const PieChart: React.FC = () => (
    <ResponsivePie
        data={data}
        margin={{ top: 15, right: 15, bottom: 80, left: 15 }}
        innerRadius={0.3}
        padAngle={0.7}
        cornerRadius={3}
        enableRadialLabels={false}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="inherit:darker(1.6)"
        theme={{
            "background": "#ffffff",
            "textColor": "#333333",
            "fontSize": 14,
            "axis": {
                "domain": {
                    "line": {
                        "stroke": "#777777",
                        "strokeWidth": 1
                    }
                },
                "ticks": {
                    "line": {
                        "stroke": "#777777",
                        "strokeWidth": 1
                    }
                }
            },
            "grid": {
                "line": {
                    "stroke": "#dddddd",
                    "strokeWidth": 2
                }
            }
        }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 70,
                itemHeight: 30,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
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
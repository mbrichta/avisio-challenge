import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ProductData } from '../../types';

interface Props {
    data: ProductData[]
    filter: string
}

const BarChart: React.FC<Props> = ({ data, filter }) => (
    <ResponsiveBar
        data={data}
        keys={filter === "Currency" ? ["currency"] : ["quantity"]}
        indexBy="product"
        borderRadius={3}
        margin={{
            "top": 15,
            "right": 10,
            "bottom": 50,
            "left": 50
        }}
        padding={0.3}
        colors={{ scheme: 'category10' }}
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
        borderColor="inherit:darker(1.6)"
        axisBottom={{
            "tickSize": 3,
            "tickPadding": 3,
            "tickRotation": 0,
            "legend": "Products",
            "legendPosition": "middle",
            "legendOffset": 35
        }}
        axisLeft={{
            "tickSize": 3,
            "tickPadding": 3,
            "tickRotation": 0,
            "legend": filter === "Currency" ? "Currency" : "Quantity",
            "legendPosition": "middle",
            "legendOffset": -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
);

export default BarChart;
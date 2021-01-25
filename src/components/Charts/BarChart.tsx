import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ProductData } from '../../types';
import { CHART_THEME } from '../../constants';

interface Props {
    data: ProductData[]
    filter: string
}

const BarChart: React.FC<Props> = ({ data, filter }) => (
    <ResponsiveBar
        data={data}
        keys={filter === "currency" ? ["currency"] : ["quantity"]}
        indexBy="product"
        borderRadius={3}
        margin={{
            "top": 35,
            "right": 10,
            "bottom": 50,
            "left": 50
        }}
        padding={0.3}
        colors={{ scheme: 'category10' }}
        theme={CHART_THEME}
        borderColor="inherit:darker(1.6)"
        axisBottom={{
            "tickSize": 3,
            "tickPadding": 3,
            "tickRotation": 0,
            "legend": "Products",
            "legendPosition": "middle",
            "legendOffset": 40
        }}
        axisLeft={{
            "tickSize": 3,
            "tickPadding": 3,
            "tickRotation": 0,
            "legend": filter === "Currency" ? "Currency ( € )" : "Quantity",
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
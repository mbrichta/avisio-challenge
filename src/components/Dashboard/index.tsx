import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import IncomingDeliveries from '../IncomingDeliveries';
import TopSuppliers from '../TopSuppliers';
import TopThreeProducts from '../TopThreeProducts';
import TotalOrderVolumen from '../TotalOrderVolumen';
import JSONData from '../../data/orders.json';
import './Dashboard.scss';

// Handles the responsive nature of the grid
const MyResponsiveGrid = WidthProvider(Responsive);
// Determines the screen breakpoints for the columns
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 320 };
// How many columns are available at each breakpoint
const cols = { lg: 12, md: 8, sm: 4, xs: 2, xxs: 1 };

const Dashboard: React.FC = () => {

    const [layout, setLayout] = useState({
        lg: [
            { i: "TotalOrderVolumen", x: 0, y: 0, w: 8, h: 1 },
            { i: "TopThreeProducts", x: 8, y: 0, w: 4, h: 1 },
            { i: "TopSuppliers", x: 8, y: 2, w: 4, h: 1 },
            { i: "IncomingDeliveries", x: 0, y: 3, w: 8, h: 1 }
        ],
        md: [
            { i: "TotalOrderVolumen", x: 0, y: 0, w: 5, h: 1 },
            { i: "TopThreeProducts", x: 8, y: 0, w: 3, h: 1 },
            { i: "TopSuppliers", x: 5, y: 2, w: 3, h: 1 },
            { i: "IncomingDeliveries", x: 0, y: 5, w: 5, h: 1 }
        ],
        sm: [
            { i: "TotalOrderVolumen", x: 0, y: 1, w: 4, h: 1 },
            { i: "TopThreeProducts", x: 0, y: 0, w: 2, h: 1 },
            { i: "TopSuppliers", x: 2, y: 0, w: 2, h: 1 },
            { i: "IncomingDeliveries", x: 0, y: 2, w: 4, h: 1 }
        ],
        xs: [
            { i: "TotalOrderVolumen", x: 0, y: 1, w: 2, h: 1 },
            { i: "TopThreeProducts", x: 0, y: 2, w: 2, h: 1 },
            { i: "TopSuppliers", x: 0, y: 3, w: 2, h: 1 },
            { i: "IncomingDeliveries", x: 0, y: 4, w: 2, h: 1 }
        ]
    })

    return (
        <MyResponsiveGrid
            breakpoints={breakpoints}
            cols={cols}
            autoSize={true}
            margin={[10, 10]}
            useCSSTransforms={true}
            preventCollision={true}
            layouts={layout}
        >
            <div
                key="TotalOrderVolumen"
                data-grid={{ x: 0, y: 0, w: 8, h: 1 }}
            >
                <TotalOrderVolumen />
            </div>

            <div
                key="TopThreeProducts"
                data-grid={{ x: 8, y: 0, w: 4, h: 1 }}
            >
                <TopThreeProducts />
            </div>

            <div
                key="TopSuppliers"
                data-grid={{ x: 8, y: 2, w: 4, h: 1 }}
            >
                <TopSuppliers />
            </div>

            <div key="IncomingDeliveries"
                data-grid={{ x: 0, y: 3, w: 8, h: 1 }}
            >
                <IncomingDeliveries />
            </div>


        </MyResponsiveGrid >
    );
}

export default Dashboard;

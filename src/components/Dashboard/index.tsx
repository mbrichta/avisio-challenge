import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import IncomingDeliveries from '../IncomingDeliveries';
import TopSuppliers from '../TopSuppliers';
import TopThreeProducts from '../TopThreeProducts';
import TotalOrderVolumen from '../TotalOrderVolumen';
import JSONData from '../../data/orders.json';
import './Dashboard.scss';
import { LAYOUT, BREAKPOINTS, COLUMNS } from '../../constants';

// Handles the responsive nature of the grid
const MyResponsiveGrid = WidthProvider(Responsive);


const Dashboard: React.FC = () => {

    const [orders, setOrders] = useState(JSONData);

    return (
        <MyResponsiveGrid
            breakpoints={BREAKPOINTS}
            cols={COLUMNS}
            autoSize={true}
            rowHeight={450}
            margin={[20, 20]}
            containerPadding={[30, 30]}
            useCSSTransforms={true}
            preventCollision={false}
            layouts={LAYOUT}
        >
            <div key="TotalOrderVolumen" >
                <TotalOrderVolumen />
            </div>

            <div key="TopThreeProducts" >
                <TopThreeProducts />
            </div>

            <div key="TopSuppliers" >
                <TopSuppliers />
            </div>

            <div key="IncomingDeliveries" >
                <IncomingDeliveries />
            </div>


        </MyResponsiveGrid >
    );
}

export default Dashboard;

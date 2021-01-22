import React, { useContext, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import IncomingDeliveries from '../IncomingDeliveries';
import TopSuppliers from '../TopSuppliers';
import TopThreeProducts from '../TopThreeProducts';
import TotalOrderVolumen from '../TotalOrderVolumen';
import './Dashboard.scss';
import { LAYOUT, BREAKPOINTS, COLUMNS } from '../../constants';
import { Context } from '../../Context';


// Handles the responsive nature of the grid
const MyResponsiveGrid = WidthProvider(Responsive);

const Dashboard: React.FC = () => {

    const { orders } = useContext(Context);

    return (
        <MyResponsiveGrid
            breakpoints={BREAKPOINTS}
            cols={COLUMNS}
            autoSize={true}
            rowHeight={450}
            margin={[20, 20]}
            containerPadding={[30, 30]}
            useCSSTransforms={true}
            preventCollision={true}
            layouts={LAYOUT}
        >
            <div key="TotalOrderVolumen" >
                <TotalOrderVolumen orders={orders} />
            </div>

            <div key="TopThreeProducts" >
                <TopThreeProducts orders={orders} />
            </div>

            <div key="TopSuppliers" >
                <TopSuppliers orders={orders} />
            </div>

            <div key="IncomingDeliveries" >
                <IncomingDeliveries orders={orders} />
            </div>


        </MyResponsiveGrid >
    );
}

export default Dashboard;

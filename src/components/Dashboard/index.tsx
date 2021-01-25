import React, { useContext, useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import IncomingDeliveries from '../IncomingDeliveries';
import TopSuppliers from '../TopSuppliers';
import TopThreeProducts from '../TopThreeProducts';
import TotalOrderVolumen from '../TotalOrderVolumen';
import { LAYOUT, BREAKPOINTS, COLUMNS } from '../../constants';
import { Context } from '../../Context';
import './Dashboard.scss';

// Handles the responsive nature of the grid
const MyResponsiveGrid = WidthProvider(Responsive);

const Dashboard: React.FC = () => {

    const { orders } = useContext(Context);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <main>
            <MyResponsiveGrid
                className="grid"
                breakpoints={BREAKPOINTS}
                cols={COLUMNS}
                autoSize={true}
                rowHeight={450}
                margin={[20, 20]}
                containerPadding={[30, 30]}
                useCSSTransforms={mounted}
                preventCollision={false}
                layouts={LAYOUT}
                compactType={"vertical"}
            >
                <div key="TotalOrderVolumen">
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
        </main>
    );
}

export default Dashboard;

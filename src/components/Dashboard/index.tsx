import React from 'react';
import IncomingDeliveries from '../IncomingDeliveries';
import TopSuppliers from '../TopSuppliers';
import TopThreeProducts from '../TopThreeProducts';
import TotalOrderVolumen from '../TotalOrderVolumen';
import JSONData from '../../data/orders.json';
import './Dashboard.scss';

const Dashboard: React.FC = () => {

    return (
        <div className="container">
            <TotalOrderVolumen />
            <TopThreeProducts />
            <IncomingDeliveries />
            <TopSuppliers />
        </div>
    );
}

export default Dashboard;

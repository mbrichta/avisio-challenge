import React from 'react';
import { DashboardProps, Order } from '../../types';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import styles from './IncomingDeliveries.module.scss';

const IncomingDeliveries: React.FC<DashboardProps> = ({ orders }) => {
    return (
        <ChartContainer>
            <ChartInfo chartTitle="Incoming Deliveries" />
        </ChartContainer>
    );
}

export default IncomingDeliveries;

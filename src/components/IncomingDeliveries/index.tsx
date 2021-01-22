import React from 'react';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import styles from './IncomingDeliveries.module.scss';

const IncomingDeliveries: React.FC = () => {
    return (
        <ChartContainer>
            <ChartInfo chartTitle="Incoming Deliveries" />
        </ChartContainer>
    );
}

export default IncomingDeliveries;

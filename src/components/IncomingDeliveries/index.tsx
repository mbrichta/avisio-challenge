import React from 'react';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import styles from './IncomingDeliveries.module.scss';

const IncomingDeliveries: React.FC = () => {
    return (
        <div className={styles.gridArea}>
            <ChartContainer>
                <ChartInfo chartTitle="Incoming Deliveries" />
            </ChartContainer>
        </div>
    );
}

export default IncomingDeliveries;

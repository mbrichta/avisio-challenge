import React from 'react';
import styles from './ChartContainer.module.scss';

const ChartContainer: React.FC = ({ children }) => {

    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}

export default ChartContainer;
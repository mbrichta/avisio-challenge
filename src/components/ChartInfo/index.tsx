import React from 'react';
import styles from './ChartInfo.module.scss';

interface Props {
    chartTitle: string,
    filters?: () => JSX.Element
}

const ChartInfo: React.FC<Props> = ({ chartTitle, filters }) => {

    return (
        <div className={styles.wrapper}>
            <h3>{`${chartTitle}:`}</h3>
            <div className={styles.filterWrapper}>
                {filters ? filters() : null}
            </div>
        </div>
    );
}

export default ChartInfo;
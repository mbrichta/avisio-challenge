import React, { useState } from 'react';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import Filter from '../Filter';
import styles from './TopThreeProducts.module.scss';

const TopThreeProducts: React.FC = () => {

    const [filter, setFilter] = useState<string>("Euro Amount");

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        setFilter(value);
    }

    const renderFilter = () => {
        const filter = ["Euro Amount", "Quantity"];

        return (
            <Filter name={"filter"} values={filter} changeHadler={handleFilterChange} />
        )
    }

    return (
        <div className={styles.gridArea}>
            <ChartContainer>
                <ChartInfo chartTitle="Top Three Products" filters={renderFilter} />
            </ChartContainer>
        </div>
    );
}

export default TopThreeProducts;

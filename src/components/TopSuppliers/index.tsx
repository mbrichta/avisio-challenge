import React, { useState } from 'react';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import Filter from '../Filter';
import styles from './TopSuppliers.module.scss';

const TopSuppliers: React.FC = () => {

    const [filter, setFilter] = useState<string>("Euros");

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        setFilter(value);
    }

    const renderFilters = () => {
        const filters = ["Euros", "Quantity"];

        return (
            <Filter name={"filter"} values={filters} changeHadler={handleFilterChange} />
        )
    }

    return (
        <div className={styles.gridArea}>
            <ChartContainer>
                <ChartInfo chartTitle="Top Suppliers" filters={renderFilters} />
            </ChartContainer>
        </div>
    );
}

export default TopSuppliers;

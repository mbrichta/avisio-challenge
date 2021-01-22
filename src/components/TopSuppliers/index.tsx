import React, { useState } from 'react';
import { DashboardProps, Order } from '../../types';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import Filter from '../Filter';
import styles from './TopSuppliers.module.scss';

const TopSuppliers: React.FC<DashboardProps> = ({ orders }) => {

    const [filter, setFilter] = useState<string>("Currency");

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        setFilter(value);
    }

    const renderFilters = () => {
        const filters = ["Currency", "Quantity"];

        return (
            <Filter name={"filter"} values={filters} changeHadler={handleFilterChange} />
        )
    }

    return (
        <ChartContainer>
            <ChartInfo chartTitle="Top Suppliers" filters={renderFilters} />
            <div></div>
        </ChartContainer>
    );
}

export default TopSuppliers;

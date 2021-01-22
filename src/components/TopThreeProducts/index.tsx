import React, { useState } from 'react';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo'
import { Order, DashboardProps } from '../../types/index'
import Filter from '../Filter';
import styles from './TopThreeProducts.module.scss';
import BarChart from '../Charts/BarChart';

const TopThreeProducts: React.FC<DashboardProps> = ({ orders }) => {

    const [productData, setProductData] = useState();
    const [filter, setFilter] = useState<string>("Currency");

    const getUniqueProducts = () => {

    }

    const getProductData = (orders: Order[]) => {

    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        setFilter(value);
    }

    const renderFilter = () => {
        const filter = ["Currency", "Quantity"];

        return (
            <Filter name={"filter"} values={filter} changeHadler={handleFilterChange} />
        )
    }

    return (
        <ChartContainer>
            <ChartInfo chartTitle="Top Three Products" filters={renderFilter} />
            <div className={styles.chartWrapper}>
                <BarChart />
            </div>
        </ChartContainer>
    );
}

export default TopThreeProducts;

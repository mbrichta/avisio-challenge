import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context';
import { DashboardProps, PieChartData, SupplierData } from '../../types';
import ChartInfo from '../ChartInfo';
import PieChart from '../Charts/PieChart';
import Filter from '../Filter';
import styles from './TopSuppliers.module.scss';

const TopSuppliers: React.FC<DashboardProps> = ({ orders }) => {

    const { getUniqueValues, getTotalFromOrder } = useContext(Context);

    const [filter, setFilter] = useState<string>("currency");
    const [chartData, setChartData] = useState<PieChartData[]>([]);

    useEffect(() => {
        const chartData = getChartData();
        setChartData(chartData);
    }, [filter]);

    const getChartData = () => {
        const suppliersData = getSupplierData();

        if (filter === "currency") {
            const sortedSuppliersData = suppliersData.sort((supplierA, supplierB) => supplierB.currency - supplierA.currency);
            const topThreeSuppliers = sortedSuppliersData.splice(0, 3);
            const chartData: PieChartData[] = topThreeSuppliers.map(supplier => ({ id: supplier.supplier, value: supplier.currency }));

            return chartData;
        } else {
            const sortedSuppliersData = suppliersData.sort((supplierA, supplierB) => supplierB.quantity - supplierA.quantity)
            const topThreeSuppliers = sortedSuppliersData.splice(0, 3);
            const chartData: PieChartData[] = topThreeSuppliers.map(supplier => ({ id: supplier.supplier, value: supplier.quantity }));

            return chartData;
        }
    }

    const getSupplierData = () => {

        const suppliersName = orders.map(order => order.supplier);
        const uniqueNames = getUniqueValues(suppliersName);

        const suppliersData: SupplierData[] = uniqueNames.map(name => {

            //Get orders of the same supplier
            const ordersFromSameSupplier = orders.filter(order => order.supplier === name);

            //Get the total amount of the order and add them
            const totalCurrency = ordersFromSameSupplier.map(order => getTotalFromOrder(order));
            const totalCurrencyFromSupplier = totalCurrency.reduce((acc, curr) => acc += curr);
            //Get the total cuantity and add them
            const totalQuantity = ordersFromSameSupplier.map(order => Number(order.quantity));
            const totalQuantityFromSupplier = totalQuantity.reduce((acc, curr) => acc += curr);

            return { supplier: name, currency: Math.ceil(totalCurrencyFromSupplier), quantity: totalQuantityFromSupplier }
        })

        return suppliersData;
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setFilter(value);
    }

    const renderFilters = () => {
        const filters = ["currency", "quantity"];

        return (
            <Filter name={"filter"} values={filters} changeHadler={handleFilterChange} />
        );
    }

    return (
        <div className={styles.container}>
            <ChartInfo chartTitle="Top Suppliers" filters={renderFilters} />
            <div className={styles.wrapper}>
                <PieChart data={chartData} filter={filter} />
            </div>
        </div>
    );
}

export default TopSuppliers;

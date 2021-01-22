import React, { useEffect, useState } from 'react';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo'
import { Order, DashboardProps, ProductData } from '../../types/index'
import Filter from '../Filter';
import styles from './TopThreeProducts.module.scss';
import BarChart from '../Charts/BarChart';

const TopThreeProducts: React.FC<DashboardProps> = ({ orders }) => {

    const [chartData, setChartData] = useState<ProductData[]>([])
    const [filter, setFilter] = useState<string>("Currency");

    useEffect(() => {
        const products = getProductData();
        const topThree = getTopThreeProducts(products)
        setChartData(topThree)
    }, [filter])

    const getTopThreeProducts = (products: ProductData[]) => {
        if (filter === "Currency") {
            const topThree = products.sort((a, b) => (b.currency - a.currency)).slice(0, 3);

            return topThree
        } else {
            const topThree = products.sort((a, b) => (b.quantity - a.quantity)).slice(0, 3);

            return topThree
        }
    }

    const getProductData = () => {

        const productNames = orders.map(order => order.productName);
        const uniqueNames = Array.from(new Set(productNames))

        const productData: ProductData[] = uniqueNames.map(name => {

            //Get orders of the same products
            const sameProduct = orders.filter(order => order.productName === name);

            //Get the total amount of the order and add them
            const totalCurrency = sameProduct.map(order => (Number(order.quantity) * Number(order.price)));
            const totalCurrencyFromProduct = totalCurrency.reduce((acc, curr) => acc += curr);
            //Get the total cuantity and add them
            const totalQuantity = sameProduct.map(order => Number(order.quantity))
            const totalQuantityFromProduct = totalQuantity.reduce((acc, curr) => acc += curr)

            return { product: name, currency: Math.ceil(totalCurrencyFromProduct), quantity: totalQuantityFromProduct }
        })

        return productData
    }

    getProductData();

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
                <BarChart data={chartData} filter={filter} />
            </div>
        </ChartContainer>
    );
}

export default TopThreeProducts;

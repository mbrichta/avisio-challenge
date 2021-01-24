import React, { useContext, useEffect, useState } from 'react';
import { MONTHS } from '../../constants';
import { Context } from '../../Context';
import { LineChartData, DashboardProps, Order, DataPoint } from '../../types';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import LineChart from '../Charts/LineChart';
import Filter from '../Filter';
import styles from './TotalOrderVolumen.module.scss';

const TotalOrderVolumen: React.FC<DashboardProps> = ({ orders }) => {

    const {
        getUniqueValues,
        formatDate,
        getTotalFromOrder,
        getTotalOrderVolumen
    } = useContext(Context);

    const [filters, setFilters] = useState({ month: "full year", suppliers: "all", categoryOne: "all", categoryTwo: "all" });
    const [chartData, setChartData] = useState<LineChartData[]>([]);

    useEffect(() => {
        const filteredOrders: Order[] = applyFilters(orders);
        const ordersByMonth: Order[][] = getOrdersByMonth(filteredOrders);

        getDailyChartData(ordersByMonth, filters.month, 2020)
        const yearlyData = getMonthlyChartData(ordersByMonth, 2020)
        setChartData(yearlyData);

    }, [filters]);

    const getDailyChartData = (ordersByMonth: Order[][], month: string, year: number) => {

        const monthNumberValue = MONTHS.indexOf(month) + 1;
        const dayInMonth = new Date(year, monthNumberValue, 0).getDate();
        const orderInMonth = ordersByMonth[monthNumberValue];
        const ordersInDay = orderInMonth.map(order => formatDate(order.orderedOn).getDate());


        //console.log(ordersInDay)
    }


    const getMonthlyChartData = (ordersByMonth: Order[][], year: number) => {

        const dataPoints: DataPoint[] = ordersByMonth.map((month, indx) => {
            const monthlyOrderVolumen = getTotalOrderVolumen(month);
            const monthString = MONTHS[indx];

            return { "x": monthString, "y": monthlyOrderVolumen }
        })

        const chartData: LineChartData = {
            id: year,
            data: dataPoints
        }

        return [chartData];
    }

    const applyFilters = (orders: Order[]) => {
        let filteredOrders = orders.filter(order => (
            filters.suppliers === 'all' ? order : order.supplier === filters.suppliers
        ))

        filteredOrders = filteredOrders.filter(order => (
            filters.categoryOne === 'all' ? order : order.productCategory1 === filters.categoryOne
        ))
        filteredOrders = filteredOrders.filter(order => (
            filters.categoryTwo === 'all' ? order : order.productCategory2 === filters.categoryTwo
        ))

        return filteredOrders;
    }


    const getOrdersByMonth = (orders: Order[]) => {

        const orderData = orders.map(order => (
            { ...order, orderTotal: getTotalFromOrder(order) }
        ))

        const ordersInSameMonth = MONTHS.map((month, indx) => {
            const orders = orderData.filter(order => {
                const date = formatDate(order.orderedOn);

                return date.getMonth() === indx;
            })

            return orders.filter(order => order !== undefined)
        })

        return ordersInSameMonth;
    }


    //console.log(getOrdersByMonth())

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target;

        switch (name) {
            case "month":
                setFilters({ ...filters, [name]: value });
                break;
            case "suppliers":
                setFilters({ ...filters, [name]: value });
                break;
            case "categoryOne":
                setFilters({ ...filters, [name]: value });
                break;
            case "categoryTwo":
                setFilters({ ...filters, [name]: value });
                break;
        }
    }



    const renderFilters = () => {
        //get array of all values
        const suppliers = orders.map(order => order.supplier)
        const categoryOne = orders.map(order => order.productCategory1);
        const categoryTwo = orders.map(order => order.productCategory2);
        //get only unique values
        const uniqueSuppliers = getUniqueValues(suppliers);
        const uniqueCategorieOne = getUniqueValues(categoryOne);
        const uniqueCategorieTwo = getUniqueValues(categoryTwo);

        return (
            <>

                <Filter
                    name={"suppliers"}
                    values={uniqueSuppliers}
                    changeHadler={handleFilterChange}
                    allOption={true}
                />
                <Filter
                    name={"categoryOne"}
                    values={uniqueCategorieOne}
                    changeHadler={handleFilterChange}
                    allOption={true}
                />
                <Filter
                    name={"categoryTwo"}
                    values={uniqueCategorieTwo}
                    changeHadler={handleFilterChange}
                    allOption={true}
                />
            </>
        );
    }

    return (
        <div className={styles.container}>
            <ChartInfo chartTitle="Order Volumen" filters={renderFilters} />
            <div className={styles.wrapper}>
                <Filter
                    name={"month"}
                    values={MONTHS}
                    changeHadler={handleFilterChange}
                    allOption={true}
                    firstOptionText={"Full year"}
                />
                <LineChart data={chartData} />
            </div>
        </div>
    );
}

export default TotalOrderVolumen;

import React, { useContext, useEffect, useState } from 'react';
import { MONTHS } from '../../constants';
import { Context } from '../../context';
import { LineChartData, DashboardProps, Order, DataPoint } from '../../types';
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

    const [filters, setFilters] = useState({ month: "all", suppliers: "all", categoryOne: "all", categoryTwo: "all" });
    const [chartData, setChartData] = useState<LineChartData[]>([]);

    useEffect(() => {
        const filteredOrders: Order[] = applyFilters(orders);
        const ordersByMonth: Order[][] = getOrdersByMonth(filteredOrders);
        const monthNumber = MONTHS.indexOf(filters.month) + 1;

        if (filters.month === "all") {
            const chartData = getMonthlyChartData(ordersByMonth, 2020);
            setChartData(chartData);
        } else {
            const chartData = getDailyChartData(ordersByMonth, monthNumber, 2020);
            setChartData(chartData);
        }

    }, [filters]);

    const getDailyChartData = (ordersByMonth: Order[][], month: number, year: number) => {

        const daysInMonth = new Date(year, month, 0).getDate();
        const orderInMonth = ordersByMonth[month - 1];
        let ordersInDay = orderInMonth.map(order => ({ ...order, orderedDay: formatDate(order.orderedOn).getDate() }));
        let dataPoints: DataPoint[] = []
        for (let i = 0; i < daysInMonth; i++) {
            dataPoints.push({ x: i, y: 0 })
        }

        dataPoints = dataPoints.map((point, indx) => {
            const sameDayOrders = ordersInDay.filter(order => point.x === order.orderedDay);

            if (ordersInDay) {
                const total = getTotalOrderVolumen(sameDayOrders);

                return { x: point.x, y: total };
            } else {

                return point;
            }
        })

        const chartData: LineChartData = {
            id: MONTHS[month - 1],
            data: dataPoints
        }

        return [chartData];
    }


    const getMonthlyChartData = (ordersByMonth: Order[][], year: number) => {

        const dataPoints: DataPoint[] = ordersByMonth.map((month, indx) => {
            const monthlyOrderVolumen = getTotalOrderVolumen(month);
            const monthString = MONTHS[indx];

            return { "x": monthString, "y": monthlyOrderVolumen };
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

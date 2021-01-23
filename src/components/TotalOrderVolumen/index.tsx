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

    const [filters, setFilters] = useState({ suppliers: "all", categoryOne: "all", categoryTwo: "all" })
    const [chartData, setChartData] = useState<LineChartData[]>([])
    const [supplierFilter, setSupplierFilter] = useState<string>("all");
    const [categoryOneFilter, setCategoryOneFilter] = useState<string>("all");
    const [categoryTwoFilter, setCategoryTwoFilter] = useState<string>("all");

    useEffect(() => {
        const filteredOrders: Order[] = applyFilters(orders);
        const ordersByMonth: Order[][] = getOrdersByMonth(filteredOrders);

        const yearlyData = getYearlyChartData(ordersByMonth, '2020')
        setChartData(yearlyData);

    }, [filters]);

    const getYearlyChartData = (ordersByMonth: Order[][], year: string) => {

        const dataPoints: DataPoint[] = ordersByMonth.map((month, indx) => {
            const monthlyOrderVolumen = getTotalOrderVolumen(month)
            const monthString = MONTHS[indx]

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

    const getChartData = (orders: Order[]) => {

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
            case "suppliers":
                setSupplierFilter(value);
                setFilters({ ...filters, [name]: value });
                break;
            case "categoryOne":
                setCategoryOneFilter(value);
                setFilters({ ...filters, [name]: value });
                break;
            case "categoryTwo":
                setCategoryTwoFilter(value)
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
        <ChartContainer>
            <ChartInfo chartTitle="Order Volumen" filters={renderFilters} />
            <div className={styles.chartWrapper}>
                <LineChart data={chartData} />
            </div>
        </ChartContainer>
    );
}

export default TotalOrderVolumen;

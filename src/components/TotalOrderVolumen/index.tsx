import React, { useState } from 'react';
import { MONTHS } from '../../constants';
import { LineChartData, DashboardProps } from '../../types';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import Filter from '../Filter';
import styles from './TotalOrderVolumen.module.scss';

const TotalOrderVolumen: React.FC<DashboardProps> = ({ orders }) => {

    const [supplierFilter, setSupplierFilter] = useState<string>("all");
    const [categoryOneFilter, setCategoryOneFilter] = useState<string>("all");
    const [categoryTwoFilter, setCategoryTwoFilter] = useState<string>("all");

    const getOrderVolumen = () => {

        const data = MONTHS.map((month, indx) => {
            const amountOrdered: LineChartData = {
                id: month,
                data: []
            };

            orders.map(order => {
                const orderedMonth = getMonthStringFromDate(order.orderedOn);
                const orderedDay = getOrderDay(order.orderedOn);

                if (month === orderedMonth) {
                    const amount = Number(order.price) * Number(order.quantity);
                    const day = getOrderDay(order.orderedOn)
                    amountOrdered.data.push({ x: day, y: amount })
                }
            })

            return amountOrdered;
        })

        console.log(data)
        return data.slice(0, 1);
    }

    const getNumberInAMonth = (month: number, year: number) => {

        const date = new Date(year, month, 0)
        const numberOfDays = date.getDate();

        console.log(numberOfDays)
    }

    getNumberInAMonth(7, 2020);

    const getOrderDay = (stringDate: string) => {
        const date = new Date(stringDate);
        const day = date.getMonth() + 1;

        return day;
    }

    const getMonthStringFromDate = (stringDate: string) => {
        const date = new Date(stringDate);
        const month = date.getDate();

        return MONTHS[month - 1];
    }

    const getUniqueValues = (array: string[]) => {
        const uniqueValues = new Set(array);

        return Array.from(uniqueValues);
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target;

        switch (name) {
            case "suppliers":
                setSupplierFilter(value);
                break;
            case "categoryOne":
                setCategoryOneFilter(value);
                break;
            case "categoryTwo":
                setCategoryTwoFilter(value)
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
        </ChartContainer>
    );
}

export default TotalOrderVolumen;

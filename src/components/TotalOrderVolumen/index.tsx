import React, { useState } from 'react';
import { MONTHS } from '../../constants';
import JSONData from '../../data/orders.json';
import { Order, LineChartData } from '../../types';
import LineChart from './LineChart';
import styles from './TotalOrderVolumen.module.scss';

const TotalOrderVolumen: React.FC = () => {

    const [orders, setOrders] = useState(JSONData);
    const [supplierFilter, setSupplierFilter] = useState<string>("all");
    const [categoryOneFilter, setCategoryOneFilter] = useState<string>("all");
    const [categoryTwoFilter, setCategoryTwoFilter] = useState<string>("all");

    const testData = [
        {
            id: "Jan",
            data: [
                { x: 1, y: 400 },
                { x: 4, y: 1600 },
                { x: 2, y: 800 }
            ]
        },
        {
            id: "Feb",
            data: [
                { x: 1, y: 200 },
                { x: 4, y: 600 },
                { x: 2, y: 900 }
            ]
        },
        {
            id: "Mar",
            data: [
                { x: 4, y: 2000 },
                { x: 8, y: 7600 },
                { x: 3, y: 400 }
            ]
        }
    ]

    const getOrderVolumen: LineChartData[] = () => {

        const data = MONTHS.map((month, indx) => {
            const amountOrdered = {
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

        return [...data];
    }

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

    const renderSupplierFilter = () => {
        const suppliers = orders.map(order => order.supplier)
        const uniqueSuppliers = getUniqueValues(suppliers);

        return (
            <select
                className={styles.filterSelect}
                onChange={handleFilterChange}
                name="suppliers"
            >
                <option value="all">Suppliers</option>
                {uniqueSuppliers.map((supplier, indx) => (
                    <option key={indx} value={supplier}>{supplier}</option>
                ))}
            </select>
        );
    }

    const renderCategoryOneFilter = () => {
        const categoryOne = orders.map(order => order.productCategory1);
        const categoryTwo = orders.map(order => order.productCategory2);
        const uniqueCategorieOne = getUniqueValues(categoryOne);
        const uniqueCategorieTwo = getUniqueValues(categoryTwo);

        return (
            <>
                <select
                    className={styles.filterSelect}
                    onChange={handleFilterChange}
                    name="categoryOne"
                >
                    <option value="all">First Category</option>
                    {uniqueCategorieOne.map((category, indx) => (
                        <option key={indx} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    className={styles.filterSelect}
                    onChange={handleFilterChange}
                    name="categoryTwo"
                >
                    <option value="all">Seccond Category</option>
                    {uniqueCategorieTwo.map((category, indx) => (
                        <option key={indx} value={category}>{category}</option>
                    ))}
                </select>

            </>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h3>Order Volumen:</h3>
                <div className={styles.filterWrapper}>
                    {renderSupplierFilter()}
                    {renderCategoryOneFilter()}
                </div>
            </div>

            <LineChart data={getOrderVolumen()} />
        </div>
    );
}

export default TotalOrderVolumen;

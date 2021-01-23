import React, { createContext, useState, useEffect } from 'react';
import { Order } from '../types';
import JSONData from '../data/orders.json';

interface ContextProps {
    orders: Order[]
    getUniqueValues: (array: string[]) => string[],
    formatDate: (stringDate: string) => Date
    getTotalFromOrder: (order: Order) => number,
    getTotalOrderVolumen: (orders: Order[]) => number
}

const Context = createContext<ContextProps>({} as ContextProps);

const ContextProvider: React.FC = ({ children }) => {

    const [orders, setOrders] = useState<Order[]>(JSONData);

    const getUniqueValues = (array: string[]) => {
        const uniqueValues = new Set(array);

        return Array.from(uniqueValues);
    }

    const formatDate = (stringDate: string) => {
        const wrongFormatDate = new Date(stringDate);
        const month = wrongFormatDate.getDate();
        const day = wrongFormatDate.getMonth() + 1;
        const year = wrongFormatDate.getFullYear();

        return new Date(year, month, day)
    }

    const getTotalOrderVolumen = (orders: Order[]) => {
        if (orders === undefined || orders.length == 0) {
            return 0;
        } else {
            const orderVolumen = orders.map(order => getTotalFromOrder(order));
            const monthlyOrderVolumen = orderVolumen.reduce((acc, curr) => acc += curr);

            return monthlyOrderVolumen;
        }
    }

    const getTotalFromOrder = (order: Order) => {
        return Math.ceil(Number(order.price) * Number(order.quantity))
    }

    return (
        <Context.Provider
            value={{
                orders,
                getUniqueValues,
                formatDate,
                getTotalFromOrder,
                getTotalOrderVolumen
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
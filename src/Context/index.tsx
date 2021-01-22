import React, { createContext, useState, useEffect } from 'react';
import { Order } from '../types';
import JSONData from '../data/orders.json';

interface ContextProps {
    orders: Order[]
}

const Context = createContext<ContextProps>({} as ContextProps);

const ContextProvider: React.FC = ({ children }) => {

    const [orders, setOrders] = useState<Order[]>(JSONData);

    return (
        <Context.Provider value={{ orders }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
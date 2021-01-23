import React, { useContext } from 'react';
import { Context } from '../../Context';
import { DashboardProps, Order } from '../../types';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import styles from './IncomingDeliveries.module.scss';

const IncomingDeliveries: React.FC<DashboardProps> = ({ orders }) => {

    const { getTotalFromOrder } = useContext(Context);

    // I'm going to set a arbitrary date to be able to play with the data
    const CURRENT_DATE = new Date(2020, 5, 10);
    const { formatDate } = useContext(Context);

    const getIncomingDeliveries = () => {
        const orderDates: Order[] = orders.map(order => {
            const deliveryDate = formatDate(order.deliveryDate);

            if (deliveryDate.getTime() >= CURRENT_DATE.getTime()) {

                return { ...order, recieved: false, orderTotal: getTotalFromOrder(order) };
            } else {
                return { ...order, recieved: true, orderTotal: getTotalFromOrder(order) };
            }
        })

        return orderDates;
    }

    const renderIncomingDeliveries = (orders: Order[]) => {
        const incomingDeliveries = orders.filter(order => order.receive === false)
        console.log(incomingDeliveries)
    }

    renderIncomingDeliveries(orders)


    return (
        <ChartContainer>
            <ChartInfo chartTitle="Incoming Deliveries" />
            <div className={styles.tableHeader}>
                <div>Product ID:</div>
                <div>Supplier:</div>
                <div>Order Date:</div>
                <div>Total Amount:</div>
            </div>
        </ChartContainer>
    );
}

export default IncomingDeliveries;

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import { DashboardProps, Order } from '../../types';
import ChartInfo from '../ChartInfo';
import styles from './IncomingDeliveries.module.scss';

// I'm going to set a arbitrary date to simulate incoming deliveries
const CURRENT_DATE = new Date(2020, 5, 10);

const IncomingDeliveries: React.FC<DashboardProps> = ({ orders }) => {

    const {
        formatDate,
        getTotalFromOrder,
        getUniqueValues,
        getTotalOrderVolumen
    } = useContext(Context);

    const [incomingDeliveries, setIncomingDeliveries] = useState<Order[]>([]);

    useEffect(() => {
        const incomingDeliveries = getIncomingDeliveries(orders);
        setIncomingDeliveries(incomingDeliveries);
    }, [])

    const getIncomingDeliveries = (orders: Order[]) => {
        const orderDates: Order[] = orders.map(order => {
            const deliveryDate = formatDate(order.deliveryDate);

            if (deliveryDate.getTime() > CURRENT_DATE.getTime()) {

                return { ...order, recieved: false, orderTotal: getTotalFromOrder(order) };
            } else {

                return { ...order, recieved: true, orderTotal: getTotalFromOrder(order) };
            }
        })

        return orderDates.filter(order => order.recieved === false);
    }

    const renderIncomingDeliveries = () => {
        const suppliers = getUniqueValues(incomingDeliveries.map(order => order.supplier));
        const groupedBySupplier = suppliers.map(sup => {
            const sameSupplier = incomingDeliveries.filter(order => order.supplier === sup);

            return sameSupplier
        })

        return groupedBySupplier.map((group, index) => {

            return (
                <div key={index} className={styles.orderGroup}>
                    <div className={styles.columnSupplier}>
                        <p key={group[0].productId}>{group[0].supplier}</p>
                    </div>
                    <div className={styles.column}>
                        {group.map(order => (
                            <div key={order.productId}>{order.productName}</div>
                        ))}
                    </div>
                    <div className={styles.column}>
                        {group.map(order => {
                            const formatedDate = formatDate(order.deliveryDate);

                            return (
                                <div key={order.productId}>
                                    {`${formatedDate.getDate()}/${formatedDate.getMonth()}/${formatedDate.getFullYear()}`}
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.column}>
                        {group.map(order => (
                            <div key={order.productId}>{getTotalFromOrder(order)}€</div>
                        ))}
                        <div className={styles.totalColumn}>
                            {getTotalOrderVolumen(group)}€
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className={styles.container}>
            <ChartInfo chartTitle="Incoming Deliveries" />
            <div className={styles.tableWrapper}>
                <div className={styles.tableHeader}>
                    <div className={styles.column}>Supplier:</div>
                    <div className={styles.column}>Product Name:</div>
                    <div className={styles.column}>Delivery Date:</div>
                    <div className={styles.column}>Total Amount:</div>
                </div>
                {renderIncomingDeliveries()}
            </div>
        </div>
    );
}

export default IncomingDeliveries;

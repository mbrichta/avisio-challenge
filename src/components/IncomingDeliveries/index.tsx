import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context';
import { DashboardProps, Order } from '../../types';
import ChartContainer from '../ChartContainer';
import ChartInfo from '../ChartInfo';
import styles from './IncomingDeliveries.module.scss';

// I'm going to set a arbitrary date to be able to play with the data
const CURRENT_DATE = new Date(2020, 5, 10);

const IncomingDeliveries: React.FC<DashboardProps> = ({ orders }) => {

    const { formatDate, getTotalFromOrder, getUniqueValues, getTotalOrderVolumen } = useContext(Context);

    const [incomingDeliveries, setIncomingDeliveries] = useState<Order[]>([]);

    useEffect(() => {
        const incomingDeliveries = getIncomingDeliveries(orders);
        setIncomingDeliveries(incomingDeliveries);

    }, [])

    const getIncomingDeliveries = (order: Order[]) => {
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
        //const groupedSuppliers = [];
        const groupedBySupplier = suppliers.map(sup => {
            const sameSupplier = incomingDeliveries.filter(order => order.supplier === sup)

            return sameSupplier
        })

        return groupedBySupplier.map((group, index) => {
            const productIDs = group.map(order => order.productId);
            const suppliers = group.map(order => order.supplier);
            const orderDate = group.map(order => formatDate(order.orderedOn));
            const totalAmount = group.map(order => getTotalFromOrder(order));
            return (
                <div key={index} className={styles.orderGroup}>
                    <div className={styles.column}>
                        {group.map(order => (
                            <div>{order.productId}</div>
                        ))}
                    </div>
                    <div className={styles.column}>
                        {group.map(order => (
                            <div>{order.supplier}</div>
                        ))}
                    </div>
                    <div className={styles.column}>
                        {group.map(order => {
                            const formatedDate = formatDate(order.deliveryDate);
                            return (
                                <div>
                                    {`${formatedDate.getDate()}/${formatedDate.getMonth()}/${formatedDate.getFullYear()}`}
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.column}>
                        {group.map(order => (
                            <div>{getTotalFromOrder(order)}</div>
                        ))}
                    </div>
                </div>
            )
        })
    }


    return (
        <ChartContainer>
            <ChartInfo chartTitle="Incoming Deliveries" />
            <div className={styles.tableWrapper}>
                <div className={styles.tableHeader}>
                    <div className={styles.column}>Product ID:</div>
                    <div className={styles.column}>Supplier:</div>
                    <div className={styles.column}>Delivery Date:</div>
                    <div className={styles.column}>Total Amount:</div>
                </div>
                {renderIncomingDeliveries()}
            </div>
        </ChartContainer>
    );
}

export default IncomingDeliveries;

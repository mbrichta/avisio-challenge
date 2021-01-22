export type Order = {
    supplier: string;
    productId: string,
    productName: string;
    productCategory1: string;
    productCategory2: string;
    orderedOn: string;
    price: string;
    quantity: string | number;
    deliveryDate: string
}

export interface DashboardProps {
    orders: Order[]
}

interface DataPoint {
    x: number | string | Date
    y: number | string | Date
}

export type LineChartData = {
    id: string | number
    data: DataPoint[]
}

export type MarginObject = {
    [P: string]: [number, number]
}
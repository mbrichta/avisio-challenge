import { type } from "os"

export type Order = {
    supplier: string;
    productId: string,
    productName: string;
    productCategory1: string;
    productCategory2: string;
    orderedOn: string;
    price: string;
    quantity: string | number;
    deliveryDate: string;
    recieved?: boolean
}

// Shape of Dashboard Props
export interface DashboardProps {
    orders: Order[]
}

// Shape of Line chart point
export interface DataPoint {
    "x": number | string | Date
    "y": number | string | Date
}

// Type for Line chart Data
export type LineChartData = {
    id: string | number
    data: DataPoint[]
}

export type PieChartData = {
    id: string,
    value: number
}

export type MarginObject = {
    [P: string]: [number, number]
}

export type ProductData = {
    product: string,
    currency: number,
    quantity: number
}

export type SupplierData = {
    supplier: string,
    currency: number,
    quantity: number
}
export type Order = {
    supplier: string;
    productId: number,
    productName: string;
    productCategory1: string;
    productCategory2: string;
    orderedOn: string;
    price: number;
    quantity: number;
    deliveryDate: string
}

export type LineChartData = {
    id: string | number
    data: Array<{
        x: number | string | Date
        y: number | string | Date
    }>
}
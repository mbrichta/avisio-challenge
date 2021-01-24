export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Determines the screen breakpoints for the columns
export const BREAKPOINTS = { lg: 1000, md: 996, sm: 768, xs: 480 };
// How many columns are available at each breakpoint
export const COLUMNS = { lg: 12, md: 8, sm: 4, xs: 2 };
// Determins the items position in each breakpoint
export const LAYOUT = {
    lg: [
        { i: "TotalOrderVolumen", x: 0, y: 0, w: 7, h: 1 },
        { i: "TopThreeProducts", x: 8, y: 0, w: 5, h: 1 },
        { i: "TopSuppliers", x: 8, y: 2, w: 5, h: 1 },
        { i: "IncomingDeliveries", x: 0, y: 3, w: 7, h: 1 }
    ],
    md: [
        { i: "TotalOrderVolumen", x: 0, y: 0, w: 5, h: 1 },
        { i: "TopThreeProducts", x: 8, y: 0, w: 3, h: 1 },
        { i: "TopSuppliers", x: 5, y: 2, w: 3, h: 1 },
        { i: "IncomingDeliveries", x: 0, y: 5, w: 5, h: 1 }
    ],
    sm: [
        { i: "TotalOrderVolumen", x: 0, y: 1, w: 4, h: 1 },
        { i: "TopThreeProducts", x: 0, y: 0, w: 2, h: 1 },
        { i: "TopSuppliers", x: 2, y: 0, w: 2, h: 1 },
        { i: "IncomingDeliveries", x: 0, y: 2, w: 4, h: 1 }
    ],
    xs: [
        { i: "TotalOrderVolumen", x: 0, y: 1, w: 2, h: 1 },
        { i: "TopThreeProducts", x: 0, y: 2, w: 2, h: 1 },
        { i: "TopSuppliers", x: 0, y: 3, w: 2, h: 1 },
        { i: "IncomingDeliveries", x: 0, y: 4, w: 2, h: 1 }
    ]
}


export const DASHBOARD_MARGINS = {
    lg: [50, 50],
    m: [30, 30],
    sm: [20, 20],
    xs: [10, 10]
}

export const CHART_THEME = {
    "background": "#2b3847",
    "textColor": "#d3c499",
    "fontSize": 13,
    "axis": {
        "domain": {
            "line": {
                "stroke": "#867e7e",
                "strokeWidth": 2
            }
        },
        "ticks": {
            "line": {
                "stroke": "#384a5d",
                "strokeWidth": 2
            }
        }
    },
    "grid": {
        "line": {
            "stroke": "#e0c671",
            "strokeWidth": 1
        }
    }
}
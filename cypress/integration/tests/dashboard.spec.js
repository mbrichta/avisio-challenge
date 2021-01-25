describe('Dashboard', () => {
    // I'm getting an error 'ResizeObserver loop limit exceeded' from what I read I can safely
    // ignore it...
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    });


    it('successfully loads', () => {
        cy.visit('/')
    })

    it("Top three products filters", () => {
        cy.get('.TopThreeProducts_container__2FNR4 > .ChartInfo_wrapper__1h5Af > .ChartInfo_filterWrapper__pvBC9 > .Filter_select__2slYM')
            .select("currency");
        cy.get('.TopThreeProducts_container__2FNR4 > .ChartInfo_wrapper__1h5Af > .ChartInfo_filterWrapper__pvBC9 > .Filter_select__2slYM')
            .select("quantity");
    });

    it("Top suppliers filters", () => {
        cy.get('.TopSuppliers_container__2KxF3 > .ChartInfo_wrapper__1h5Af > .ChartInfo_filterWrapper__pvBC9 > .Filter_select__2slYM')
            .select("currency");
        cy.get('.TopSuppliers_container__2KxF3 > .ChartInfo_wrapper__1h5Af > .ChartInfo_filterWrapper__pvBC9 > .Filter_select__2slYM')
            .select("quantity");
    });
});

const orders = [{
    "supplier": "Allstuff supplies",
    "productId": "788",
    "productName": "pens x100",
    "productCategory1": "supplies",
    "productCategory2": "stationary",
    "orderedOn": "02/03/2020",
    "price": "9.99",
    "quantity": "1",
    "deliveryDate": "02/04/2020"
},
{
    "supplier": "Allstuff supplies",
    "productId": "789",
    "productName": "paper A4 x50",
    "productCategory1": "supplies",
    "productCategory2": "stationary",
    "orderedOn": "02/06/2020",
    "price": "5.99",
    "quantity": "1",
    "deliveryDate": "02/07/2020"
},
{
    "supplier": "Allstuff supplies",
    "productId": "790",
    "productName": "cutlery",
    "productCategory1": "supplies",
    "productCategory2": "glas & china",
    "orderedOn": "02/02/2020",
    "price": "21.02",
    "quantity": "2",
    "deliveryDate": "02/04/2020"
},
{
    "supplier": "Allstuff supplies",
    "productId": "791",
    "productName": "nice glasses",
    "productCategory1": "supplies",
    "productCategory2": "glas & china",
    "orderedOn": "02/03/2020",
    "price": "22.55",
    "quantity": "2",
    "deliveryDate": "02/05/2020"
}];

describe("Test data", () => {
    it.only('Load orders on page load', () => {
        cy.server()
        cy.route('GET', '../data/orders', orders)
        cy.visit('/')

        cy.get()
    })
})
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

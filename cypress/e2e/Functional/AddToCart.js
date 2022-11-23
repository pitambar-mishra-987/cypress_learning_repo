/// <reference types="Cypress" />
import GreenKartHomePage from '../../support/pageObjects/GreenKartHomePage'

describe('Greenkart Page Validation',()=>{
    
    it.only('Verify Add To cart end to end functionality',()=>{
        const greenKartHomePage = new GreenKartHomePage()
        cy.visit(Cypress.env('baseUrl')+'/seleniumPractise/#/')
        
        cy.title().should('eq', 'GreenKart - veg and fruits kart')
        greenKartHomePage.searchBox().type('ca')
        cy.get('.product').should('have.length',5)
        cy.get('.product:visible').should('have.length',4)
        cy.wait(2000)
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length',4)
        //Directly click on hardcoded item
        //cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()
        cy.get('@productLocator').find('.product').each(($e1,index,$list)=>{

            const vegetableName = $e1.find('h4.product-name').text()
            if(vegetableName.includes('Cashews')){
                $e1.find('button').trigger('click')
            }
        })
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.get('.cartTable').find('tbody tr td').eq(1).then(prodText =>{

            let productText = prodText.text()
            expect(productText).to.eq("Cashews - 1 Kg")
        })
        cy.contains('Place Order').click()
        cy.get('select').select('United Kingdom').should('have.value','United Kingdom')
        cy.wait(2000)
        cy.get('button').click()
        cy.get('span b').then(errText =>{
            expect(errText.text()).to.eq('Please accept Terms & Conditions - Required')
        })
        cy.get('.chkAgree').check()
        cy.get('button').click()
        cy.get('[style="color:green;font-size:25px"]').then(successText=>{
            let successMessage = successText.text()
            expect(successMessage).to.include('Thank you, your order has been placed successfully ')
        })
    })
    it('Verify number of items in Add To cart page',()=>{
        const greenKartHomePage = new GreenKartHomePage()
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        
        cy.title().should('eq', 'GreenKart - veg and fruits kart')
        greenKartHomePage.searchBox().type('bro')
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length',1)
    })
})
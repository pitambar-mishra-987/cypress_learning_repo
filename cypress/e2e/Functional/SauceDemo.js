/// <reference types="Cypress" />

describe('Sauce Demo UI Verification',()=>{
    beforeEach(()=>{
        cy.visit(Cypress.env('sauceDemoUrl'))
    })
    it('Verify ordering one product from Sauce demo application',()=>{
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include','inventory.html')
        cy.title().should('eq','Swag Labs')
        cy.get('.inventory_list').find('.inventory_item').each(($e1,index,$list)=>{
            
            const productName = $e1.find('div.inventory_item_name').text()
            if(productName == 'Sauce Labs Onesie'){
                $e1.find('button').trigger('click')
            }
        })
        cy.get('.shopping_cart_badge').then(badge=>{
            expect(badge.text()).to.eq('1')
        })
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').then(inventoryName=>{
            expect(inventoryName.text()).to.eq('Sauce Labs Onesie')
        })
        cy.get('.cart_quantity').then(quantity=>{
            expect(quantity.text()).to.eq('1')
        })
        cy.get('#checkout').click()
        cy.get('#first-name').type('John').should('have.value','John')
        cy.get('#last-name').type('Miller').should('have.value','Miller')
        cy.get('#postal-code').type('57123').should('have.value','57123')
        cy.get('#continue').click()
        cy.get('[data-test="finish"]').click()
        cy.get('h2.complete-header').then(message=>{
            expect(message.text()).to.eq('THANK YOU FOR YOUR ORDER')
        })
    })
    it('Verify ordering multiple products from Sauce demo application',()=>{
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include','inventory.html')
        cy.title().should('eq','Swag Labs')
        cy.AddProductToCart('Sauce Labs Backpack')
        cy.AddProductToCart('Sauce Labs Onesie')
        cy.get('.shopping_cart_badge').then(badge=>{
            expect(badge.text()).to.eq('2')
        })
        cy.get('.shopping_cart_link').click()
        cy.get('#checkout').click()
        cy.get('#first-name').type('John').should('have.value','John')
        cy.get('#last-name').type('Miller').should('have.value','Miller')
        cy.get('#postal-code').type('57123').should('have.value','57123')
        cy.get('#continue').click()
        cy.get('[data-test="finish"]').click()
        cy.get('h2.complete-header').then(message=>{
            expect(message.text()).to.eq('THANK YOU FOR YOUR ORDER')
        })
    })
})
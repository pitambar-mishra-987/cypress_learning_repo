// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//

Cypress.Commands.add("selectProduct", (productName) => { 
    cy.get('h4.card-title').each(($el, index, $list) => {
        if($el.text().includes(productName))
        {
            cy.get('button.btn.btn-info').eq(index).click()
        }
        
        })


})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('HitAPIAndValidateResponse', (key, value)=>{

    cy.request({
        method: 'POST',
        url: 'http://216.10.245.166/Library/Addbook.php',
        body: {
            "name":"Learn Appium Automation with Java",
            "isbn":"bcggsss42342",
            "aisle":"bcggsss42342",
            "author":"John foe"
        }
    }).then(response=>{
        //cy.log(key[0].length)
        expect(response.body).to.have.property(key,value)
        expect(response.body.ID).to.eq("bcggsss42342bcggsss42342")
    })
})

Cypress.Commands.add('HitAPI',(method,url,body)=>{

    cy.request({
        method: method,
        url: url,
        body: body
    }).then(res =>{
        // cy.log(res.body)
    })
})

export function generateAlphaNumericString(length) {
    //var length = 9;
    var result = '';
    var characters = 'ABCDEFabcdef0123456789'
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function generateDynamicNumbers(length) {

    var result = '';
    var characters = '0123456789'
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

Cypress.Commands.add('AddProductToCart',(productAddToCart)=>{
    cy.get('.inventory_list').find('.inventory_item').each(($e1,index,$list)=>{
            
        const productName = $e1.find('div.inventory_item_name').text()
        if(productName == productAddToCart){
            $e1.find('button').trigger('click')
        }
    })
})
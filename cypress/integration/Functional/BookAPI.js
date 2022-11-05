let url = 'http://216.10.245.166/Library/'
import * as commonFunction from "../../support/commands"

describe('Book API Validation', function () {

    it('Add Book API verification', function () {

        let isbn = commonFunction.generateDynamicNumbers(7)
        let aisle = commonFunction.generateDynamicNumbers()
        cy.request('POST', url + "Addbook.php", {

            "name": "Learn Appium Automation with Java",
            "isbn": isbn,
            "aisle": aisle,
            "author": "John foe"
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property("Msg", "successfully added")
            expect(response.body.ID).to.eq(isbn + aisle)
        })
    })
    it('Validate adding a book using AddBook API and retrieve it using GetBook API', () => {
        let body = {
            "name": "Learn Cypress with JavaScript",
            "isbn": commonFunction.generateDynamicNumbers(7),
            "aisle": commonFunction.generateDynamicNumbers(7),
            "author": "Pitambar Mishra"
        }
        cy.HitAPI('POST', url + "Addbook.php", body).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.Msg).to.eq("successfully added")
            expect(response.body.ID).to.eq(body.isbn + body.aisle)
            let bookId = response.body.ID
            cy.wait(2000)
            cy.HitAPI('GET', url + 'GetBook.php?ID=' + bookId).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body[0].book_name).to.eq(body.name)
                expect(res.body[0].isbn).to.eq(body.isbn)
                expect(res.body[0].aisle).to.eq(body.aisle)
                expect(res.body[0].author).to.eq(body.author)
            })
        })
    })
})
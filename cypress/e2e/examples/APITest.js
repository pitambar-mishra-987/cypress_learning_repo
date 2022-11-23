let url = 'http://216.10.245.166/Library/'
let bookId
describe('My First Test Suite', function () {

    it('My FirstTest case', function () {

        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {

            "name": "Learn Appium Automation with Java",
            "isbn": "bcggsss",
            "aisle": "22s7",
            "author": "John foe"
        }).then(function (response) {
            expect(response.body).to.have.property("Msg", "successfully added")
            expect(response.status).to.eq(200)
        })
    })
})

describe('Book API Test Suite', () => {

    it('Add Book API',  () => {

        cy.HitAPIAndValidateResponse("Msg","successfully added")
        // .then(res =>{
        //     cy.log(res.body.tos)
            // expect(res.body.msg).to.eq("successfully added")
            // expect(res.body.id).to.eq("bcggsss4234222s73234234")

            // {msg: successfully added, 
            //     id: bcggsss4234222s73234234}

        // })
    })
    it('Validate Add and Get Book API', () =>{

        cy.request({
            method: 'POST',
            url: 'http://216.10.245.166/Library/Addbook.php',
            body: {
                "name":"Learn Appium Automation with Java",
                "isbn":"109111",
                "aisle":"19911",
                "author":"John foe"
            }
        }).then(response=>{
            cy.log(response.body)
            expect(response.body.Msg).to.eq("successfully added")
            expect(response.body.ID).to.eq("10911119911")
            let bookId = response.body.ID
            cy.request({
                method:'GET',
                url: 'http://216.10.245.166/Library/GetBook.php?ID='+bookId
            }).then(res=>{
                cy.log(res.body[0])
            })
        })
    })
    it.only('Hit API using common method', ()=>{
        var bookId
        let body = {
                "name":"Learn Appium Automation with Java",
                "isbn":"109111",
                "aisle":"1991121123411",
                "author":"John foe"
        }
        cy.HitAPI('POST', url+"Addbook.php", body).then(response=>{
            expect(response.body.Msg).to.eq("successfully added")
            expect(response.body.ID).to.eq(body.isbn+body.aisle)
            bookId = response.body.ID
        })
        cy.HitAPI('GET',url+'GetBook.php?ID='+bookId).then(res=>{
            expect(res.body[0].book_name).to.eq(body.name)
            expect(res.body[0].isbn).to.eq(body.isbn)
            expect(res.body[0].aisle).to.eq(body.aisle)
            expect(res.body[0].author).to.eq(body.author)
        })
    })
})
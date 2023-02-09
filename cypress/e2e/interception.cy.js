describe('Intercept with test examples',()=>{
    it('Test API with simple Intercept',()=>{
        cy.visit('https://reqres.in');
        cy.intercept({
            method:'GET',
            path:'/api/users?page=2',
        }).as('posts');
        cy.get("ul:nth-of-type(1) a[href='/api/users?page=2'").click();
        cy.wait('@posts').then(inter=>{
            console.log(inter.response.body);
            assert.isNotNull(inter.response.body,"this is not null")
            expect(inter.response.body).to.be.an('object');
        })
    })
    it('should recieve our customized response',()=>{

            cy.visit('https://reqres.in');
            cy.intercept('GET','/api/users?page=2',{totalposts:5, name:'santhosh'}).as('posts')
            cy.get("ul:nth-of-type(1) a[href='/api/users?page=2'").click();
            cy.wait('@posts').then(inter=>{
                console.log(inter.response.body);
                assert.isNotNull(inter.response.body,"this is not null")
                expect(inter.response.body).to.be.an('object');
            })
    })
    it.only('mocking the intercept test with dynamic fixture',()=>{
        cy.visit('https://reqres.in');
        cy.intercept('GET','/api/users?page=2',{fixture:'dataDrivePost.json'}).as('posts')
        cy.get('ul:nth-of-type(1) a[href="/api/users?page=2"').click();
        cy.wait('@posts').then(inter=>{
            console.log(inter.response.body.name);
            assert.isNotNull(inter.response.body,"this is not null")
            expect(inter.response.body).to.be.an('array');
        })
    })
})
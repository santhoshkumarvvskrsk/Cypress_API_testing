
const { faker } = require('@faker-js/faker');
var fname = faker.name.firstName();
var job = faker.name.lastName();

describe('Practicing the API testing using cypress',()=>{
    const BASE_URL = Cypress.env('baseUrl');
    it('create test data for post API',()=>{
        const arry =[];
        for(let i=0;i<10;i++){
            cy.log(i);
            let temp ={};
            temp['name']=faker.name.firstName();
            temp['job']=faker.name.lastName();
            arry.push(temp);
    }
         cy.log(arry.length);
         cy.writeFile('cypress/fixtures/dataDrivePost.json',JSON.stringify(arry));
    })
    it('The API which retrives the list of users',()=>{
        cy.log(Cypress.env('baseUrl'));
        cy.request({
            method: 'GET',
            url: BASE_URL+'/api/users?page=2'
        }).then((res)=>{
            expect(res.body).to.have.property('page',2);
            // cy.log(res.body.data[0].email);
            res.body.data.forEach(element => {
                cy.log(element.email);
            });
        })
    })
    it('The API which creates dynamically',()=>{
            var arry1 =[];
        cy.readFile('cypress/fixtures/dataDrivePost.json').then((txt)=>{
            txt.map((ele)=>{
                cy.request({
                    method: 'POST',
                    url: BASE_URL+'/api/users',
                    body:{
                        "name":ele.name,
                        "job":ele.job
                    }
                }).then((res)=>{
                    let temp1 ={};
                    temp1['resId']= res.body.id;
                    arry1.push(temp1);
                    cy.log(arry1);
                    cy.writeFile('cypress/fixtures/userData.json',JSON.stringify(arry1));
                });
            }) 
        })
    })
    it('Update the API after creating data',()=>{
        cy.readFile('cypress/fixtures/userData.json').then((txt)=>{
            cy.log(txt.userName);
            txt.map((ele)=>{
                cy.request({
                    method:'PUT',
                    url: BASE_URL+'/api/users/'+ele.resId,
                    body:{
                        "name":fname,
                        "job":faker.name.lastName()
                    }
                });
            })
            
        });
    })
    it('Delete for the udpated ids',()=>{
        cy.readFile('cypress/fixtures/userData.json').then((txt)=>{
            cy.log(txt.userName);
            txt.map((ele)=>{
                cy.request({
                    method:'DELETE',
                    url: BASE_URL+'/api/users/'+ele.resId
                });
            })
            
        });
    })
})

const url = 'http://localhost:3000/products';
let rowid;
describe('Check Local API', () => {
    //Visit The URL and Check Table if it has Data
    it('Visit the URL', () => {
        cy.visit(url);
        cy.get('#MongoTable').should('length', 1);
    });

    //Check if Input Modal Works
    it('Check Input Modal', () => {
        cy.visit(url);
        //Click the Add Button
        cy.get('#AddBtn').click();
        cy.wait(600);
        //Check if Modal and Appropriate Button Exists
        cy.get('#InputModal').should('be.visible');
        cy.get('#RegisterBtn').should('be.visible');

        //Check if ID has value
        cy.get('#ID').invoke('val').should('not.be.empty');

        //Check if Fields are empty
        cy.get('#Name').should('be.empty');
        cy.get('#Email').should('be.empty');
        cy.get('#Password').should('be.empty');
        cy.get('#RPassword').should('be.empty');
        cy.get('.close').click();

        //Check if Modal is CLosed and not shown
        cy.get('#InputModal').should('not.exist');
    });

    
    //Check if the Modal can Register Account
    it('Check Register Account', () => {
        cy.visit(url);
        cy.wait(1000);
        //Click Add Button to Show Modal
        cy.get("#AddBtn").click();

        // Add account using data from account.json file
        cy.fixture('account.json').then((account) => {
            //Type and Check if value is valid
            cy.get('#Name').type(account.name, {force: true});
            cy.get('#Name').should('have.value', account.name);
            cy.get('#Name').should('have.class', 'is-valid');

            //Type and Check if value is valid
            cy.get('#Email').type(account.email);
            cy.get('#Email').should('have.value', account.email);
            cy.get('#Email').should('have.class', 'is-valid');
            
            //Type and Check if value is valid
            cy.get('#Password').type(account.password);
            cy.get('#Password').should('have.value',account.password);
            cy.get('#Password').should('have.class', 'is-valid');

            //Type and Check if value is valid
            cy.get('#RPassword').type(account.password);
            cy.get('#RPassword').should('have.value', account.password);
            cy.get('#RPassword').should('have.class', 'is-valid');
        });
        //Click Register Button
        cy.get('#RegisterBtn').click();
        cy.wait(1000);

        //Check if A Toast of Success variant is shown
        cy.get('.b-toast').should('have.class', 'b-toast-success');
        cy.get('.b-toast').should('be.visible');
    });
    

    //Check Search Account By Account ID
    it('Check Search Account by ID', () => {
        cy.visit(url);
        //Check if Account exists using a sample ID
        cy.get('#SearchID').type('100');
        cy.get('#SearchID').should('have.value', '100');
        cy.get('#SearchBtn').click();
        cy.wait(600);
        cy.get('#InputModal').should('be.visible');

        //Check if Fields have value
        cy.get("#ID").invoke('val').should('not.be.empty');
        cy.get("#Name").invoke('val').should('not.be.empty');
        cy.get("#Email").invoke('val').should('not.be.empty');
        cy.get("#Password").invoke('val').should('not.be.empty');
        cy.get("#RPassword").invoke('val').should('be.empty');

        //Check if Appropriate Button Exists
        cy.get('#UpdateBtn').should('be.visible');

        //Close and Check if Modal is CLosed and not shown
        cy.get('.close').click();
        cy.get('#InputModal').should('not.exist');
    });

    //Check Search Account by Clicking Edit Button on Table Row
    it('Check Search Account by Edit Button', () => {
        cy.visit(url);
        //Gets the Table Row ID For Checking if Result is COrrect
        cy.get('#MongoTable > tbody > tr').eq(0).find('td').first()
        .then(($res) => {
            rowid =  $res.text();

            //Click The Edit Button to Show Modal
            cy.get('#MongoTable > tbody > tr').eq(0).find('td').eq(4)
            .find('div > div').eq(1).find('button').click();

            //Check if Modal and Update Button  is Visible
            cy.get('#InputModal').should('be.visible');
            cy.get('#UpdateBtn').should('be.visible');

            //Check if Modal ID Field Value is equal to the clicked table ID Value
            cy.get('#ID').should('have.value', rowid);

            //Close and Check if Modal is Visible
            cy.get('.close').click();
            cy.get('#InputModal').should('not.exist');
        });
    });

    //Update Account Info of the last added account
    //Will Update the Email and Name
    it('Check Update Account by Search Button', () => {
        let new_name = 'Taylor Swift';
        let new_email = 'taylor.swift@mail.com';

        cy.visit(url);

        cy.get('#MongoTable > tbody > tr').last().find('td').first()
        .then((tdText) => {
            //Check if Account exists using a sample ID
            cy.get('#SearchID').type(tdText.text());
            cy.get('#SearchID').should('have.value', tdText.text());
            cy.get('#SearchBtn').click();
            cy.wait(600);
            cy.get('#InputModal').should('be.visible');

            //Type and Check if value is valid
            cy.get('#Name').clear().type(new_name, {force: true});
            cy.get('#Name').should('have.value', new_name);
            cy.get('#Name').should('have.class', 'is-valid');

            //Type and Check if value is valid
            cy.get('#Email').clear().type(new_email);
            cy.get('#Email').should('have.value', new_email);
            cy.get('#Email').should('have.class', 'is-valid');

            cy.get("#Password").invoke('val').then((pword) => {
                cy.log(pword)
                //Type and Check if value is valid
                cy.get('#RPassword').type(pword);
                cy.get('#RPassword').should('have.value', pword);
                cy.get('#RPassword').should('have.class', 'is-valid');
            });

            //Click Update Button
            //Check if Appropriate Button Exists
            cy.get('#UpdateBtn').should('be.visible').click();
            cy.wait(500);

            //Check if A Toast of Success variant is shown
            cy.get('.b-toast').should('have.class', 'b-toast-success');
            cy.get('.b-toast').should('be.visible');

        });

        

    });

    //Check if Delete Button Works
    it('Check Delete Row Button', () => {
        cy.visit(url);

        //Click Delete Button
        cy.get('#MongoTable > tbody > tr').last().find('td').last()
        .find('div > div').first().click();

        //Confirm Deletion by clicking Proceed Button
        cy.get('#DeleteModal').should('be.visible');
        cy.get('#DeleteConfirmBtn > button').last().click();
        
        //Check if A Toast of Success variant is shown
        cy.get('.b-toast').should('have.class', 'b-toast-success');
        cy.get('.b-toast').should('be.visible');
    });
});
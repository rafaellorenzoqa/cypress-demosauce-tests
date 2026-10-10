/*
1 Happy path — standard_user / secret_sauce
2 Invalid password — standard_user / wrong password
3 Unknown username — nonexistent username / some password
4 No username — blank username, password filled
5 No password — username filled, blank password
6 Empty — both fields blank
7 Whitespace-only username — spaces / fixed password
8 Whitespace-only password — real username / spaces
9 Whitespace-only both
10 Locked out — locked_out_user / correct password
11 Locked out + invalid password — validation-order check
*/

describe('Login', () => {

    beforeEach(() => {
        // Arrange
        cy.visit('/');
    })

    it('TC01 - Must login correctly given valid username and password', () => {
        // Act
        cy.fixture('credentials').then(credentials => {
            cy.login(credentials.valid.username, credentials.valid.password);

            // Assert
            cy.url().should('include', '/inventory.html');
        })
    })

    it('TC02 - Must not login when username is correct, but password is invalid', () => {
        // Act
        cy.fixture('credentials').then(credentials => {
            cy.login(credentials.valid.username, "not_a_real_password");

            // Assert
            cy.get('[data-test="error"]').should('be.visible')
                .and('have.text', "Epic sadface: Username and password do not match any user in this service");
        })
    })

    it('TC03 - Must not login when username is nonexistant with some password', () => {
        // Act
        cy.login("notAUsername", "thisCouldBeaPassword");

        // Assert
        cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', "Epic sadface: Username and password do not match any user in this service");
    })

    it('TC04 - Must not login when username is blank and password is valid', () => {
        // Act
        cy.fixture('credentials').then(credentials => {
            cy.login('', credentials.valid.password);
        })

        // Assert
        cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', "Epic sadface: Username is required");
    })

    it('TC05 - Must not login when username is valid and password is blank', () => {
        // Act
        cy.fixture('credentials').then(credentials => {
            cy.login(credentials.valid.username, '');
        })

        // Assert
        cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', "Epic sadface: Password is required");
    })

    it('TC06 - Must not login when both fields are blank', () => {
        // Act
            cy.login('','');

        // Assert
        cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', "Epic sadface: Username is required");
    })

    it('TC07 - Must not login when username has whitespace-only and password is valid', () => {
        // Act
        cy.fixture('credentials').then(credentials => {
            cy.login('  ', credentials.valid.password);
        })

        // Assert
        cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', "Epic sadface: Username and password do not match any user in this service");
    })

    it('TC08 - Must not login when password is whitespace-only and username is valid', () => {
        // Act
        cy.fixture('credentials').then(credentials => {
            cy.login(credentials.valid.username, '  ');
        })

        // Assert
        cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', "Epic sadface: Username and password do not match any user in this service");
    })

    it('TC09 - Must not login when username and password are whitespace-only', () =>{
        // Act
            cy.login('  ', '  ');
        
        // Assert
        cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', "Epic sadface: Username and password do not match any user in this service");
    })

    it('TC10 - Must not login when the user is locked_out_user and password is correct', () => {
        // Act
        cy.fixture('credentials').then(credentials => {
            cy.login(credentials.lockedOut.username, credentials.lockedOut.password);
        })
        
        // Assert
        cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', "Epic sadface: Sorry, this user has been locked out.");
    })

    it('TC11 - Must not login when the user is locked out and the password is incorrect (validation order)', () =>{
        // Act
        cy.fixture('credentials').then(credentials => {
            cy.login(credentials.lockedOut.username, "notAValidPassword");
        })

        // Assert
        cy.get('[data-test="error"]').should('be.visible')
            .and('have.text', "Epic sadface: Username and password do not match any user in this service");
    })
})
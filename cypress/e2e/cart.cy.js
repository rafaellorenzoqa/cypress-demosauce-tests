/*
01 Must add the item to the cart when the button 'add to cart' is clicked from the inventory screen.
02 Must change the button label from 'add to cart' to 'remove' when a product is added to the cart from the inventory screen
03 Must add the item to the cart when the button 'add to cart' is clicked from the item screen.
04 Must change the button label from 'add to cart' to 'remove' when a product is added to the cart from the item screen
05 Must update the cart icon to display the number of items in the cart (adding)
06 Must update the cart icon to display the number of items in the cart (removing)
07 Must update the cart icon to disappear when the number of items in the cart is 0
08 Must change the button label from 'remove' to 'add to cart' when a product is removed from the cart in the inventory screen
09 Must change the button label from 'remove' to 'add to cart' when a product is removed from the cart in the item screen
10 Must allow removing items from the cart screen (item disappear from the list)
11 Must not allow the quantity number in the cart screen to be edited.
12 Button label state must persist between inventory screen and item screen
13 Button label state must persist between inventory screen and cart screen
14 Button label state must persist between item screen and cart screen
*/


describe('Cart', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.fixture('credentials').then(credentials => {
            cy.login(credentials.valid.username, credentials.valid.password);
        });
    })

    it('TC01 - Must add the item to the cart when the button "add to cart" is clicked from the inventory screen', () => {
        // Act
        cy.get('[data-test="inventory-item"]').first().within(() => { // Find the item container. There are six, so I need the first one. Within that first one...
            cy.get('[data-test="inventory-item-name"]').invoke('text').as('firstItemName'); // retrieve (invoke) the text inside the data-test, and give it the alias @firstItemName
            cy.get('button').click(); // find the button and click on it. Since each item only has one button (because of the within()), this works.
        });

        // Assert
        cy.get('[data-test="shopping-cart-link"]').click(); // Navigating to the cart screen
        cy.get('@firstItemName').then((firstItemName) => { // Retrieve the text inside the alias @firstNameItem and save it in the variable firstItemName
            cy.get('[data-test="inventory-item-name"]').should('have.text', firstItemName); // Compare the text in the item in the cart screen against the name of the item that was added
        })
    })

    it('TC02 - Must change the button label from "add to cart" to "remove" when a product is added to the cart from the inventory screen', () => {
        cy.get('[data-test="inventory-item"]').first().within(() => {
            // Arrange
            cy.get('button').should('have.text', 'Add to cart');

            // Act    
            cy.get('button').click();

            // Assert
            cy.get('button').should('have.text', 'Remove');
        })
    })

    it('TC03 - Must add the item to the cart when the button "add to cart" is clicked from the item screen.', () => {
        cy.get('[data-test="inventory-item"]').first().within(() => {
            cy.get('[data-test="inventory-item-name"]').invoke('text').as('firstItemName');
            cy.get('[data-test="inventory-item-name"]').click();
        })
        cy.url().should('include', '/inventory-item.html');
        cy.get('[data-test="add-to-cart"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();

        cy.url().should('include', '/cart.html');
        cy.get('@firstItemName').then((firstItemName) => {
            cy.get('[data-test="inventory-item-name"]').should('have.text', firstItemName);
        })
    })

    it('TC04 - Must change the button label from "add to cart" to "remove" when a product is added to the cart from the item screen.', () => {
        cy.get('[data-test="inventory-item"]').first().within(() => {
            // Arrange
            cy.get('[data-test="inventory-item-name"]').click();
        })
        cy.url().should('include', '/inventory-item.html');

        // Arrange + Act 
        cy.get('[data-test="add-to-cart"]').should('have.text', 'Add to cart').click();

        // Assert
        cy.get('[data-test="remove"]').should('have.text', 'Remove');
    })
})

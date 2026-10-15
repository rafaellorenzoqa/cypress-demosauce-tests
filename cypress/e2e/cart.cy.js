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
        // Arrange
        cy.visit('/');
        cy.fixture('credentials').then(credentials => {
            cy.login(credentials.valid.username, credentials.valid.password);
        });
    })

    it('TC01 - Must add the item to the cart when the button "add to cart" is clicked from the inventory screen', () => {
        // Act
        cy.get('[data-test="inventory-item"]').first().within(() => {
            cy.get('[data-test="inventory-item-name"]').invoke('text').as('firstItemName');
            cy.get('button').click();
        });


    })
})
import { token } from '../../fixtures/token';

describe('проверяем функционал страницы', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });
  it('добавление ингредиентов в конструктор из списка', () => {
    const burgerConstructor = cy.get('.e2e-burger-constructor');
    burgerConstructor
      .get('.e2e-burger-constructor-empty')
      .should('have.length', 3);

    cy.contains('Краторная булка N-200i').parent('li').find('button').click();
    cy.contains('Мясо бессмертных моллюсков Protostomia')
      .parent('li')
      .find('button')
      .click();

    const burgerConstructorTop = cy.get('.e2e-burger-constructor-top');
    const burgerConstructorFilling = cy.get('.e2e-burger-constructor-filling');
    const burgerConstructorBottom = cy.get('.e2e-burger-constructor-bottom');

    burgerConstructorTop
      .find('.constructor-element__text')
      .should('have.text', 'Краторная булка N-200i (верх)');

    burgerConstructorFilling
      .find('.constructor-element__text')
      .should('have.text', 'Мясо бессмертных моллюсков Protostomia');

    burgerConstructorBottom
      .find('.constructor-element__text')
      .should('have.text', 'Краторная булка N-200i (низ)');
  });

  it('открытие модального окна ингредиента и закрытие по крестику', () => {
    cy.contains('Краторная булка N-200i').parent('li').click();
    cy.get('#modals').should('not.be.empty');
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');
  });

  it('открытие модального окна ингредиента и закрытие по оверлею', () => {
    cy.contains('Краторная булка N-200i').parent('li').click();
    cy.get('#modals').should('not.be.empty');
    cy.get('#modals').children().eq(1).click({ force: true });
    cy.get('#modals').should('be.empty');
  });

  it('создание заказа', () => {
    cy.intercept('GET', 'api/auth/user', {
      headers: {
        Authorization: token,
      },
      fixture: 'user-success.json'
    }).as('getUser');
    cy.wait('@getUser');
    cy.contains('Краторная булка N-200i').parent('li').find('button').click();
    cy.contains('Мясо бессмертных моллюсков Protostomia')
      .parent('li')
      .find('button')
      .click();
    cy.contains('Оформить заказ').click();
    cy.intercept('POST', '/api/orders', {
      headers: {
        Authorization: token,
      },
      fixture: 'order-success.json'
    }).as('createOrder');
    cy.wait('@createOrder');
    cy.get('#modals').should('not.be.empty');
    cy.get('#modals').contains(66521).should('exist');
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');
    const burgerConstructor = cy.get('.e2e-burger-constructor');
    burgerConstructor
      .get('.e2e-burger-constructor-empty')
      .should('have.length', 3);
  });
});

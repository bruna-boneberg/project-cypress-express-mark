/// <reference types="cypress" />

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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createTask', (taskName = '') => {

    cy.visit('/') //visita o link

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

if(taskName !== '') {
    cy.get('@inputTask') //clica no campo de cadastrar nova tarefa
        .type(taskName) //escreve a tarefa conforme parâmetro passado
} 
    cy.contains('button', 'Create').click() // clica no botão criar
}) //encapsulamento, ou seja, criar um comando personalizado de um determinado comando que é repetido muitas vezes nos testes, possibilitando um código mais limpo e organizado e mais fácil de manter a manutenção

Cypress.Commands.add('isRequired', (targetMessage)=> {

    cy.get('@inputTask')
    .invoke('prop', 'validationMessage')
    .should((text) => {
        expect(
            targetMessage
        ).to.eq(text)
    })
})

Cypress.Commands.add('RemoveTaskByName', (taskName) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks', // caminho da API
        method: 'DELETE', //método de DELETAR
        body: { name: taskName } // Localizador
    }).then(response => { //
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('PostTask', (task) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: task //cadastra nova tarefa via API
    }).then(response => {
        expect(response.status).to.eq(201) //valida código 201(requisição foi bem sucedida e que um novo recurso foi criado)
    })
})

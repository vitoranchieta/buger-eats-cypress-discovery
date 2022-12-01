

class SignupPage {

    go() {
        cy.visit('/')

        cy.get('a[href="/deliver"]').click() //Localizador CSS que encontra exatamente o elemento
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
        //cy.get = Procurar campo
        //type = Preencher campo 
        cy.get('input[name="fullName"]').type(deliver.name)        
        cy.get('input[name="cpf"]').type(deliver.cpf)        
        cy.get('input[name="email"]').type(deliver.email)        
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)        

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)
        
        //should = comparação
        cy.get('input[name=address').should('have.value',(deliver.address.street))
        cy.get('input[name=district').should('have.value',(deliver.address.district))
        cy.get('input[name=city-uf').should('have.value',(deliver.address.city_state))

        //Contains = Função que permite juntar localizador CSS com texto
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        // ^ = começa com - tecnica de expressão regular onde procura na propriedade accept o valor que começa com 'image'
        // $ = termina com - 
        // asterisco = contém -
        // attachFile('/images/' +    = Buscar dentro da pasta images que está dentro da pasta fixtures
        // Cypress busca o nome do arquivo na pasta fixtures mas não dentro de outra pasta dentro da fixtures
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
        // O comando abaixo também poderia ser usado para fazer upload da foto
        //cy.get('input[type="file"]').attachFile(deliver.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe() {
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        cy.get('.swal2-container .swal2-html-container').should('have.text', (expectedMessage))
    }

    alertMessageShouldBe(expectedMessage) {
        // Contains - combinação de localizador com texto
        cy.contains('.alert-error', expectedMessage).should('be.visible')
        
        // Retirado para usar o metodo acima 
        // cy.get('.alert-error').should('have.text', expectedMessage)
    }
}

export default new SignupPage;
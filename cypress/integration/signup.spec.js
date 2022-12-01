import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Cadastro', () => {

    /* 
     beforeEach(function() {
         // Não precisa passar extensão do arquivo, Cypress identifica automaticamente
         // Subfunção 'then' pega o resultado da promessa 
         // Subfunção 'then' recebeu o resultado da promessa = d
         // d = abreviação de deliver
         cy.fixture('deliver').then((d) => {
             this.deliver = d
         })
 
     }) */


    /*
    //Ganchos before / beforeEach / after / afterEach
    before(() => {
        cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')

    })

    beforeEach(() => {
        cy.log('Tudo aqui é executado sempre ANTES de CADA casos de testes')

    })

    after(() => {
        cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')

    })

    afterEach(() => {
        cy.log('Tudo aqui é executado sempre DEPOIS de CADA casos de testes')

    })
    */


    it('Usuario quer ser um entregador', function () {
        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        //Criando constante para armazenar a mensagem
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)

    })


    it('CPF incorreto', function () {
        var deliver = signupFactory.deliver()

        deliver.cpf = '000000041AA'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')

    })

    it('Email incorreto', function () {
        var deliver = signupFactory.deliver()

        deliver.email = 'joaolucas.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')

    })

    context('Campos obrigatórios', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })

    })

   /* it('Required fields', function () {
        signupPage.go()
        signupPage.submit()
        signupPage.alertMessageShouldBe('É necessário informar o nome')
        signupPage.alertMessageShouldBe('É necessário informar o CPF')
        signupPage.alertMessageShouldBe('É necessário informar o email')
        signupPage.alertMessageShouldBe('É necessário informar o CEP')
        signupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        signupPage.alertMessageShouldBe('Selecione o método de entrega')
        signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')

    })*/
})

import {sql} from './db.js'

// funções que manipulam o banco de dados e são chamadas dentro das funções de request
export class DatabasePostgres{
   async listarprodutos(){
        const produtos = await sql`select * from produtos`
        return await produtos
    }

    async cadastrarproduto(produto){
        const {categoria, preco, nome} = produto

        await sql`insert into produtos(categoria,preco,nome) VALUES (${categoria}, ${preco}, ${nome}) `
    }
    async cadastrarusuario(usuario){
        const {primnome, sobrenome, email,senha,endereco} = usuario

        await sql`insert into usuario(primeironome,sobrenome,email,senha,endereco) VALUES (${primnome}, ${sobrenome}, ${email},${senha}, ${endereco}) `
    }
    async adicionarnocarrinho(produto){
        const {nomeproduto, produtoID} = produto

        await sql`insert into carrinho_compras(nomeproduto,codigo_produto) VALUES (${nomeproduto}, ${produtoID})`
    }

    async listarcarrinho(){
        const carrinho = await sql`select * from carrinho_compras`
        return await carrinho
    }

    async mostrarusuario(){
        const usuario = await sql `select * from usuario`
        return usuario
    }

}
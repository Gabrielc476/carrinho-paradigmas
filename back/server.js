import {fastify} from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database_postgres.js'

//definição da variavel server, definição da variavel database e configuração do cors
const server = fastify()
const database = new DatabasePostgres
await server.register(cors,{
    origin: "*",
})

// funções de receber e enviar dados 
server.get('/produtos', async(request, reply) =>{
    
    const produtos =  await database.listarprodutos()
    const produtosjson = await JSON.stringify(produtos)

    
    return produtosjson
})

server.post('/cadastrarproduto', async(request,reply) =>{
    const {categoria,preco,nome} = await request.body
    
    await database.cadastrarproduto({
        categoria,
        preco,
        nome
    })
    return
})
server.post('/cadastrarusuario', async(request,reply) =>{
    const {primnome,sobrenome,email,senha,endereco} = await request.body
    
    await database.cadastrarusuario({
        primnome,
        sobrenome,
        email,
        senha,
        endereco
    })
    return
})

server.post('/adicionarnocarrinho', async(request,reply) =>{
    const {nomeproduto, produtoID} = request.body
    console.log(nomeproduto)
    await database.adicionarnocarrinho({
        nomeproduto,
        produtoID
    })
    return
})

server.get('/carrinho', async(request, reply) =>{
    
    const carrinho =  await database.listarcarrinho()
    console.log(carrinho)
    

    
    return carrinho
})

server.get('/usuario', async(request,reply) =>{
    const usuario = await database.mostrarusuario()

    return usuario
})


// configuração da porta do servidor
server.listen({
    port: 3000
})
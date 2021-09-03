/* Crie uma aplicação que fará o cadastro dos pedidos de uma hamburgueria, e você deve utilizar Node e Express.

Rotas
POST /order: A rota deve receber o pedido do cliente, o nome do cliente e o valor do pedido, essas informações devem ser 
passadas dentro do corpo(body) da requisição, e com essas informações você deve registrar o novo pedido dentro de um array
 no seguinte formato: { id: "ac3ebf68-e0ad-4c1d-9822-ff1b849589a8", order: "X- Salada, 2 batatas grandes, 1 coca-cola",
  clientName:"José", price: 44.50, status:"Em preparação" }. Não se esqueça que o ID deve ser gerado por você, dentro do
   código utilizando UUID V4, assim que o pedido é criado, você deve sempre colocar o status como "Em preparação".

GET /order: Rota que lista todos os pedidos já feitos.

PUT /order/:id: Essa rota deve alterar um pedido já feito. Pode alterar,um ou todos os dados do pedido.O id do pedido deve
 ser enviado nos parâmetros da rota.

DELETE /order/:id: Essa rota deve deletar um pedido já feito com o id enviado nos parâmetros da rota.

GET /order/:id: Essa rota recebe o id nos parâmetros e deve retornar um pedido específico.

PATCH /order/:id: Essa rota recebe o id nos parâmetros e assim que ela for chamada, deve colocar o status do pedido como
"Pronto". */


const { request } = require('express')
const express = require('express')
const uuid = require('uuid')


const port = 3001
const app = express()
app.use(express.json())

const orders = []


const checkOrderId = (request, response, next) => {

    const { id } = request.params
    const index = orders.findIndex(client => client.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "Order not found" })
    }
    request.orderIndex = index
    request.orderId = id

    next()

}
const checkMethodUrl = (request, response, next) => {

    console.log(request.method)
    console.log(request.url)

    next()
}



app.get('/order', checkMethodUrl, (request, response) => {

    return response.json(orders)

})

app.post('/order', checkMethodUrl, (request, response) => {
    const { order, clientName, price } = request.body

    const pedido = { id: uuid.v4(), order, clientName, price, status: "Em preparação" }

    orders.push(pedido)

    return response.status(201).json(pedido)

})


app.put('/order/:id', checkOrderId, checkMethodUrl, (request, response) => {

    const index = request.orderIndex
    const id = request.orderId

    const { order, clientName, price } = request.body


    const changedOrder = { id, order, clientName, price, status: "Em preparação" }

    orders[index] = changedOrder

    return response.json(changedOrder)

})

app.delete('/order/:id', checkOrderId, checkMethodUrl, (request, response) => {
    const index = request.orderIndex
    

    orders.splice(index, 1)

    return response.status(204).json()

})

app.get('/order/:id', checkOrderId, checkMethodUrl, (request, response) => {
    const id = request.orderId

    const { order } = request.body

    const idOrder = { order: "X- Salada, 1 batatas grandes, 1 coca-cola" }


    return response.json(idOrder)

})



app.patch('/order/:id', checkOrderId, checkMethodUrl, (request, response) => {

    const index = request.orderIndex
    const id = request.orderId

    const { order, clientName, price, status } = request.body

    const updateOrder = { id, order, clientName, price, status: "Pronto" }
    
    orders[index] = updateOrder

    return response.json(updateOrder)

})





app.listen(port, () => {
    console.log(`🚀  Server started on port ${port}`);
})







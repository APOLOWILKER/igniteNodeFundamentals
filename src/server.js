// modulo interno como o de HTTP
// const http = require('http') - CommomJS
// import http from 'http'
// por padrão o node solicita utilizar node: antes dos imports para diferenciar seus modulos
import http from 'node:http'

import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

const PORT = 3333

/**
 * Tenho 3 tipos de dados que a aplicação front envia informações
 * Query parameters: URL Stateful: usado para Filtros, paginação, e muitas vezes não obrigatórios.
 *       http://localhost:3333/users?userId=1&name=diego
 *
 * Route Parameters: Identificação de recurso
 *        http://localhost:3333/users/1
 *
 * Request Body(HTTPs): Envio de informações de um formulário
 *      POST  http://localhost:3333/users
 *
 */

// CommomJS => require  antigo
// ESModules => import/export

/**
 * Por padrão o Node utiliza o require,
 * e o ESModule não é suportado.
 */

const server = http.createServer( async (request, response ) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
    // uso test pq toda regex tem o metodo test que retorna true ou false
  })

  if (route) {
    const routeParams = request.url.match(route.path)

    request.params = { ...routeParams.groups }

    console.log(routeParams)
    return route.handler(request, response)
  }

  console.log(route)

// early return
  return response.writeHead(404).end('Erro na aplicação')
})

server.listen(PORT)

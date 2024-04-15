// modulo interno como o de HTTP
// const http = require('http') - CommomJS
// import http from 'http'
// por padrão o node solicita utilizar node: antes dos imports para diferenciar seus modulos
import http from 'node:http'

import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

const PORT = 3333

// CommomJS => require  antigo
// ESModules => import/export

/**
 * Por padrão o Node utiliza o require,
 * e o ESModule não é suportado.
 */

const server = http.createServer( async (request, response ) => {
  const { method, url } = request

  await json(request, response)

  const route = routes
  .find(route => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(request, response)
  }

  console.log(route)

// early return
  return response.writeHead(404).end('Erro na aplicação')
})

server.listen(PORT)

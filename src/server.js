// modulo interno como o de HTTP
// const http = require('http') - CommomJS
// import http from 'http'
// por padrão o node solicita utilizar node: antes dos imports para diferenciar seus modulos
import http from 'node:http'

const PORT = 3333

const users = []

// CommomJS => require  antigo
// ESModules => import/export
/**
 * Por padrão o Node utiliza o require,
 * e o ESModule não é suportado.
 */

const server = http.createServer((request, response ) => {
  const { method, url } = request

  if (method === 'GET' && url === '/users' ) {
    return response
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if (method === 'POST' &&  url === '/users') {
    users.push({
      name: 'John Doe',
      email: 'johndoes@example.com'
    })
    return response.end( 'Criação de ursers')
  }

// early return
  return response.end('Hellow World!!! mae')
})

server.listen(PORT)

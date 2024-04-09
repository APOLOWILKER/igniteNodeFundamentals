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

const server = http.createServer( async (request, response ) => {
  const { method, url } = request

  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    request.body = null
  }

  if (method === 'GET' && url === '/users' ) {
    return response
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if (method === 'POST' &&  url === '/users') {
    const {name, email} = request.body
    users.push({
      id: 1,
      name,
      email,
    })

    return response.writeHead(201).end()
  }

// early return
  return response.writeHead(404).end('Erro na aplicação')
})

server.listen(PORT)

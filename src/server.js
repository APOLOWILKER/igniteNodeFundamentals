// modulo interno como o de HTTP
// const http = require('http') - CommomJS
// import http from 'http'
// por padrão o node solicita utilizar node: antes dos imports para diferenciar seus modulos
import http from 'node:http'

const PORT = 3333

// CommomJS => require  antigo
// ESModules => import/export
/**
 * Por padrão o Node utiliza o require,
 * e o ESModule não é suportado.
 */

const server = http.createServer((request, response ) => {
  return response.end('Hellow World!!! mae')
})

server.listen(PORT)

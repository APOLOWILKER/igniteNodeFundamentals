// /users/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  // console.log(Array.from(path.matchAll(routeParametersRegex)))
  // log do mapeamento da rota
  // [ [ ':id', 'id', index: 7, input: '/users/:id', groups: undefined ] ]

  const pathRegex =  new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}

// /users/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g

  console.log(Array.from(path.matchAll(routeParametersRegex)))
  // log do mapeamento da rota
  // [ [ ':id', 'id', index: 7, input: '/users/:id', groups: undefined ] ]
}

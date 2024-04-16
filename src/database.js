import fs from 'node:fs/promises'
// possa salvar mais dados utilizando um obj.
// ideia do banco {"users": [...]}

const dataBasePath = new URL('../db.json', import.meta.url)
/**
 * isso é como um shell um comando de terminal.
 * isso esta definindo onde vou criar o arquivo
 */

// console.log(dataBasePath)

export class Database {
  #database = {} // metodo private no js e com #

  // para ler e persistir os dados
  constructor() {
    fs.readFile(dataBasePath, 'utf-8').then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    // let it change

    if (search) {
      data = data.filter( row => {
        // {name: 'apolo', email: 'apolo@email.com'}
        // [['name', 'apolo'], ['email', 'apolo@email.com']]
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data;
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}

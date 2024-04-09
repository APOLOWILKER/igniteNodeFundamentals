// Quando pensamos em Stream pensamos em Netflix & Spotify

// ler ou ter pequenas partes de alguma coisa,
// e já conseguir trabalhar com esses dados, antes de ter o arquivo completo

/**
 * Importação de clientes via CSV (EXCEL)
 * arquivo de 1gb - 1m de linhas
 * Usuário faz POST do arquivo
 * pode demorar +100s
 * Sem Stremas - Node vai baixar tudo e depois ler tudo
 */

/**
 * Com Streams eu consigo, ler os dados da minha requisição HTTP
 * do meu upload - aos poucos, e porocessando ele enquanto
 * o arquivo ainda esta sendo feito o upload.
 */

// process.stdin
//   .pipe(process.stdout)



import { Readable, Transform, Writable } from 'node:stream';

class OneToHundreadStream extends Readable {

  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 500)
  }
}


// precisa ler dados de outro lugar e enviar dados para outro lugar
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = (Number(chunk.toString()) % 2 ) === 0 ? Number(chunk.toString()) * 10 : Number(chunk.toString()) * -1


    callback(null, Buffer.from(String(transformed)) )
  }
}

class MultiplyByTenStream extends Writable {

  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundreadStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())

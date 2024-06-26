import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {

  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 500)
  }
}

fetch('http://localhost:3334', {
  method: 'POST', // pq com streams estou enviando informações.
  body: new OneToHundredStream(), // posso passar no body uma stream.
  duplex: 'half' // necessário adiconar
}).then(response => {
  response.text().then(data => {
    console.log(data)
  })
})

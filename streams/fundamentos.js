import { error } from 'node:console';
import { Readable, Writable, Transform } from 'node:stream'

//Stream de leitura
class OneToHoundredStream extends Readable {
  index = 1;
  
  _read(){
    const i = this.index++

    setTimeout(() => {
      if (i > 100){
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
  
        this.push(buf)
      }
    }, 1000)
  }
}

//Stream de escrita
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

//Stream de transformação
class InverseNumberToNegative extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

new OneToHoundredStream()
  .pipe(new InverseNumberToNegative())
  .pipe(new MultiplyByTenStream())
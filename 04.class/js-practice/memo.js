process.stdin.resume()
process.stdin.setDefaultEncoding('utf8')
const obj = {
  memos: []
}

// 標準入力からのデータの受け取り
const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// データをobj配列にpush
reader.on('line', (text) => {
  const line = `${text}` + '\n'
  obj.memos.push({ memo: line })
})

// 配列をJSON文字列に変換
const fs = require('fs')

reader.on('close', () => {
  const json = JSON.stringify(obj)
  fs.writeFile('memos.json', json, (err, result) => {
    if (err) {
      console.log('error', err)
    }
  })
})

// -------------------------------------
const option = process.argv[2]
const jsonObject = JSON.parse(fs.readFileSync('./memos.json', 'utf8'))
if (option === '-r') {
  // console.log('これはオプションrです')
  const { Select } = require('enquirer')
  const memoary = []
  const prompt = new Select({
    name: 'memo',
    message: 'メモを選んでください',
    choices: memoary
  })
  prompt.run().then(answer => console.log(answer)).catch(console.error)
  // const jsonObject = JSON.parse(fs.readFileSync('./memos.json', 'utf8'))
  jsonObject.memos.forEach((obj, i) => {
    memoary.push({ name: obj.memo.split('\n')[0], value: i.toString(2) })
  })
}

if (option === '-l') {
  // console.log('これはオプションlです')
  jsonObject.memos.forEach((i) => {
    console.log(i.memo.split('\n')[0])
  })
}
// ----------------------------------------

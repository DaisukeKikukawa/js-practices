const fs = require('fs')
const option = process.argv[2]

const createFirstlines = () => {
  const oneLines = []
  const files = fs.readdirSync('data/')

  for (const file of files) {
    const jsonObject = JSON.parse(fs.readFileSync(`./data/${file}`, 'utf8'))
    const oneLine = jsonObject.Memo.split('\n')[0]
    oneLines.push(oneLine)
  }
  return oneLines
}

const titles = createFirstlines()

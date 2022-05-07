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

const addNewmemo = () => {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  const uuid = require('uuid')
  const fileName = uuid.v4()
  const lines = []

  const reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  reader.on('line', (line) => {
    lines.push(line)
  })
  reader.on('close', () => {
    const memo = lines.join('\n')
    const jsonText = JSON.stringify({ Memo: memo })
    fs.writeFileSync(`./data/${fileName}.json`, jsonText)
  })
}

const showFirstlines = () => {
  titles.forEach((element) => {
    console.log(element)
  })
}

class Files {
  constructor () {
    function oneLines () {
      const oneLines = []
      const files = fs.readdirSync('data/')

      for (const file of files) {
        const jsonObject = JSON.parse(
          fs.readFileSync(`./data/${file}`, 'utf8')
        )
        const oneLine = jsonObject.Memo.split('\n')[0]
        oneLines.push(oneLine)
      }
      return oneLines
    }
    this.oneLines = oneLines()
  }

  async selectFiles(oneLinesfiles, message) {
    let result = 0
    const oneLinesFilesCopy = oneLinesfiles.slice()

    const Enquirer = require('enquirer')
    const question = {
      type: 'select',
      name: 'line',
      message: message,
      choices: oneLinesfiles
    }
    const answer = await Enquirer.prompt(question)
    const files = fs.readdirSync('data/')
    result = oneLinesFilesCopy.findIndex((item) => item === answer.line)
    const selectedMemo = `./data/${files[result]}`
    return selectedMemo
  }
}

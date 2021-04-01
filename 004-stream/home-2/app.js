const fs = require('fs')
const path = require('path')

const yargs = require('yargs')
const csv = require('csv-parser')

const results = []

yargs.command({
    command: 'parse',
    describe: 'Parsing CSV log file',
    builder: {
        filename: {
            describe: 'Provide name of the file in home-1 folder',
            demandOption: true,
            type: 'string'
        }
    }
})

fs.createReadStream(path.resolve(yargs.argv.filename))
    .pipe(csv(['date', 'time', 'computer', 'computerScore', 'user', 'userScore']))
    .on('data', data => results.push(data))
    .on('end', () => parse(results))

function parse(results) {
    const totalScore = results.length
    const winScore = results.filter(result => {
        return parseInt(result.userScore) === parseInt(result.computerScore)
    }).length
    const winRatio = (winScore / totalScore * 100).toFixed(2)

    console.log(`Количество сыгранных партий: ${totalScore}`)
    console.log(`Количество выйгранных партий: ${winScore}`)
    console.log(`Количество проигранных партий: ${totalScore - winScore}`)
    console.log(`Всего выйграно ${winRatio}% партий`)
}

yargs.parse()

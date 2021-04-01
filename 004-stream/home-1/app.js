const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const yargs = require('yargs')
yargs.command({
    command: 'log',
    describe: 'Logging game results',
    builder: {
        filename: {
            describe: 'Provide filename',
            demandOption: true,
            type: 'string'
        }
    }
})

function getDate() {
    const OPTIONS = {
        hour12: false,
        dateStyle: 'short',
        timeStyle: 'medium',
    }

    return new Date().toLocaleString('ru-RU', OPTIONS)
}

function tossCoin() {
    return Math.round(Math.random())
}

rl.question(`Бросаем монетку... Ваш выбор: "орёл" (0) или "решка" (1) ? \n> `, userAnswer => {
    const ANSWER = parseInt(userAnswer)
    const COIN = tossCoin()
    let results = getDate()

    ANSWER === COIN
        ? console.log(`Вы угадали! Выпало ${COIN}`)
        : console.log(`Вы ошиблись! Выпало ${COIN}. Попробуйте ещё раз.`)

    results += `, Computer, ${COIN}, Player, ${ANSWER}`

    fs.appendFile(yargs.argv.filename, `${results}\n`, err => {
        if (err) throw err
    })

    rl.close()
})

rl.on('close', () => {
    console.log(`--------------`)
    console.log(`Игра окончена!`)
})

yargs.parse()

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

const date = new Date()
const dateConfig = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
}

function getDate() {
    let formattedDate = ''

    formattedDate += dateConfig.year + '.'
    formattedDate += dateConfig.month < 10 ? '0' + dateConfig.month + '.' : dateConfig.month + '.'
    formattedDate += dateConfig.date < 10 ? '0' + dateConfig.date + ' ' : dateConfig.date + ' '
    formattedDate += dateConfig.hour < 10 ? '0' + dateConfig.hour + ':' : dateConfig.hour + ':'
    formattedDate += dateConfig.minutes < 10 ? '0' + dateConfig.minutes + ':' : dateConfig.minutes + ':'
    formattedDate += dateConfig.seconds < 10 ? '0' + dateConfig.seconds : dateConfig.seconds

    return formattedDate
}

function tossCoin() {
    return Math.round(Math.random())
}

rl.question(`Бросаем монетку... Ваш выбор: "орёл" (0) или "решка" (1) ? \n> `, userAnswer => {
    let user = parseInt(userAnswer)
    let coin = tossCoin()
    let results = getDate()

    if (parseInt(user) === coin) {
        console.log(`Вы угадали! Выпало ${coin}`)
    } else {
        console.log(`Вы ошиблись! Выпало ${coin}. Попробуйте ещё раз.`)
    }

    results += `,Computer,${coin},Player,${user}`

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

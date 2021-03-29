const fs = require('fs')
const readline = require('readline')

const yargs = require('yargs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function tossCoin() {
    return Math.round(Math.random())
}

yargs.command({
    command: 'add'
})

rl.setPrompt(`Бросаем монетку... Ваш выбор: орёл (0) или решка (1) ?`)
rl.prompt()
rl.on('line', answer => {
    let userAnswer = parseInt(answer)
    let tossedCoin = tossCoin()

    // console.log('user: ', userAnswer)
    // console.log('coin: ', tossedCoin)

    if (userAnswer === tossedCoin) {
        console.log(`Вы угадали! Выпало ${tossedCoin}`)
    } else {
        console.log(`Вы ошиблись! Выпало ${tossedCoin}`)
    }
    rl.close()
})

rl.on('close', () => {
    console.log(`Игра окончена`)
})

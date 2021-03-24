#! /usr/bin/env node

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const randomNumber = Math.round(Math.random() * 100)

rl.setPrompt('Загадано число в диапазоне от 0 до 100: ')
rl.prompt()

rl.on('line', answer => {
    let answerNumber = parseInt(answer)

    if (answerNumber > randomNumber) {
        console.log('Больше')
    } else if (answerNumber < randomNumber) {
        console.log('Меньше')
    } else if (answerNumber === randomNumber) {
        console.log(`Отгадано число ${answerNumber}`)
        rl.close()
    }
})

rl.on('close', () => {
    console.log(`Игра окончена!`)
})


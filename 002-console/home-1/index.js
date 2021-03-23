#! /usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
    .command('current', 'Display current Year, Month or Date')
    .command('add', 'Display future Year, Month or Date')
    .command('sub', 'Display past Year, Month or Date')
    .alias('year', 'y')
    .alias('month', 'm')
    .alias('date', 'd')
    .argv
const argvArr = argv._

const date = new Date()
const dateConfig = {
    dateTime  : date.toISOString(),
    dateYear  : date.getFullYear(),
    dateMonth : date.getMonth(),
    dateDate  : date.getDate()
}

if (argvArr.includes('current')) {
    if (argv.year) console.log(dateConfig.dateYear)
    if (argv.month) console.log(dateConfig.dateMonth)
    if (argv.date) console.log(dateConfig.dateDate)
    if (Object.keys(argv).length === 2) console.log(dateConfig.dateTime)
} else if (argvArr.includes('add')) {
    if (argv.year) console.log(dateConfig.dateYear + argv.year)
    if (argv.month) console.log(dateConfig.dateMonth + argv.month)
    if (argv.date) console.log(dateConfig.dateDate + argv.date)
} else if (argvArr.includes('sub')) {
    if (argv.year) console.log(dateConfig.dateYear - argv.year)
    if (argv.month) console.log(dateConfig.dateMonth - argv.month)
    if (argv.date) console.log(dateConfig.dateDate - argv.date)
} else {
    console.log('Unreckognized input')
}

console.log(argv)

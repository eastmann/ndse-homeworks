const http = require('http')

const dotenv = require('dotenv')
const yargs = require('yargs')

dotenv.config()

const API = 'api.weatherstack.com'
const API_KEY = process.env.APIKey
const HTTP_OPTIONS = {
    protocol: 'http:',
    hostname: API,
    path: `/current?access_key=${API_KEY}`,
    method: 'GET'
}

yargs.command({
    command: 'weather',
    describe: 'Getting weather from API',
    builder: {
        city: {
            describe: 'Provide city name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        getWeather(argv.city, HTTP_OPTIONS)
    }
})

if (!yargs.argv._.length) {
    console.warn('Use "weather" command with option "--city=<name>" provided!')
}

function getWeather(city, options) {
    options.path += encodeURI(`&query=${city}&units=m`)
    const req = http.request(options, res => {
        res.on('data', data => {
            const weather = JSON.parse(data)
            const location = weather.request.query
            const temperature = weather.current.temperature
            process.stdout.write(`The current temperature in ${location} is ${temperature} degrees Celsius.`)
        })
    })

    req.on('error', err => {
        console.error(err)
    })

    req.end()
}

yargs.parse()

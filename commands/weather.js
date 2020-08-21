const axios = require('axios');
const Command = require('./command');

const Config = require('../config');

const openWeatherApi = 'https://api.openweathermap.org/data/2.5%endpoint%&appid=%apiKey%&units=metric&lang=sp';
const singleCityEndpoint = '/weather?q=%city%';
const apiKey = Config.OpenWeatherMapAppId;
const regex = /\!(tiempo)\s(.*)*/gm;

const weatherMainIcons = {
    200: { icon: '🌩'},
    201: { icon: '🌩'},
    202: { icon: '🌩'},
    210: { icon: '🌩'},
    211: { icon: '🌩'},
    212: { icon: '🌩'},
    221: { icon: '🌩'},
    232: { icon: '⛈'},
    232: { icon: '⛈'},
    300: { icon: '🌦'},
    301: { icon: '🌦'},
    302: { icon: '🌦'},
    310: { icon: '🌦'},
    311: { icon: '🌦'},
    312: { icon: '🌦'},
    313: { icon: '🌦'},
    314: { icon: '🌦'},
    321: { icon: '🌦'},
    500: { icon: '🌧'},
    501: { icon: '🌧'},
    502: { icon: '🌧'},
    503: { icon: '🌧'},
    504: { icon: '🌧'},
    511: { icon: '🌧'},
    520: { icon: '🌧'},
    521: { icon: '🌧'},
    522: { icon: '🌧'},
    531: { icon: '🌧'},
    600: { icon: '🌨'},
    601: { icon: '🌨'},
    602: { icon: '🌨'},
    611: { icon: '🌨'},
    612: { icon: '🌨'},
    613: { icon: '🌨'},
    615: { icon: '🌨'},
    616: { icon: '🌨'},
    620: { icon: '🌨'},
    621: { icon: '🌨'},
    622: { icon: '🌨'},
    701: { icon: '🌫'},
    711: { icon: '🌫'},
    721: { icon: '🌫'},
    731: { icon: '🌫'},
    741: { icon: '🌫'},
    751: { icon: '🌫'},
    761: { icon: '🌫'},
    762: { icon: '🔥'},
    771: { icon: '💦'},
    781: { icon: '🌪'},
    800: { icon: '☀️'},
    801: { icon: '🌤'},
    802: { icon: '⛅️'},
    803: { icon: '🌥'},
    804: { icon: '☁️'},
};

class Weather extends Command {
    call (msg, city) {
        let number = /(\d+)/gm;
        let cityIsNumber = number.exec(city);

        if (cityIsNumber) {
            city = city +', ES';
        }

        let endpoint = singleCityEndpoint.replace('%city%', city);
        let apiHost = openWeatherApi.replace('%endpoint%', endpoint);
        apiHost = apiHost.replace('%apiKey%', apiKey);

        const bot = this.bot;

        axios.get(apiHost)
        .then(function (response) {
            let data = response.data;

            let messageData = {
                city: data.name,
                country: data.sys.country,
                emoji: weatherMainIcons[data.weather[0].id].icon,
                description: data.weather[0].description,
                temperature: data.main.temp,
                temperatureFeels: data.main.feels_like,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            };

            let message = 'El tiempo en %city% (%country%) es de %description% %emoji%, con una temperatura 🌡 de %temperature%º (sensación de %temperatureFeels%º). La humedad 💧 es de %humidity%% y la presión de %pressure% bares.';

            for (let [key, value] of Object.entries(messageData)) {
                message = message.replace('%'+key+'%', value);
            };

            bot.sendMessage(msg.chat.id, message);
        })
        .catch(function (error) {
            bot.sendMessage(msg.chat.id, '‼️ Ops, ahora no puedo darte la previsión del tiempo, prueba más tarde ‼️');
        });
    }
    start () {
        this.bot.on('text', (msg) => { 
            let matches = regex.exec(msg.text);
            if (matches && matches.length > 1 && matches[1] === 'tiempo') {
                this.call(msg, matches[2]);
            }
         });
    }
}

module.exports = new Weather();
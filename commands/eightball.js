const Command = require('./command');
const checkCommand = require('../utils/check_disabled_command');

const answers = [
    "Es cierto",
    "Sin duda",
    "Sí, definitivamente",
    "Puedes confiar en ello",
    "Como yo lo veo, sí",
    "Más que probable",
    "Buenas perspectivas",
    "Si",
    "Las señales apuntan a que sí",
    "Respuesta confusa, intenta otra vez",
    "Pregunta de nuevo más tarde",
    "Mejor no te lo digo ahora",
    "No se puede predecir ahora",
    "Concéntrate y pregunta otra vez",
    "No cuentes con ello",
    "Mi respuesta es no",
    "Mis fuentes dicen que no",
    "No pinta bien",
    "Lo veo dudoso"
];

class Eightball extends Command {
    start () {
        this.bot.on('text', (msg) => { 
            checkCommand(msg.chat.id, 'Eightball').then((enabled) => {
                let regex = /(\!bola(ocho|8)\s.*)/gm;
                let command = regex.exec(msg.text);

                if ((msg.text === '!bola8' || msg.text === '!bolaocho') && command === null && enabled) {
                    msg.reply.text('¿Por qué no intentas preguntarme algo...? 😕', { asReply: true });
                    return;
                }

                if (command === null) {
                    return;
                }
                
                this.bot.sendMessage(msg.chat.id, 'Ummmh 🙄... deja que piense... 🤔');

                (new Promise(r => setTimeout(r, 2000)).then(() => {
                    let message = answers[Math.floor(Math.random()*answers.length)];
                    msg.reply.text(message, { asReply: true });
                }));
            });
         });
    }
}

module.exports = new Eightball();
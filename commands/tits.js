const axios = require('axios');
const Command = require('./command');
const checkCommand = require('../utils/check_disabled_command');

const redditSite = 'https://www.reddit.com';
const redditApi = 'https://www.reddit.com/r/legalteens+gonewild+nsfw+nsfw_gif+tits+realgirls/.json?';
let latest;

class Tits extends Command {
    call (msg) {
        const bot = this.bot;

        axios.get(redditApi)
        .then(function (response) {
            let data = response.data;

            let randomPost = () => {
                let random = data.data.children[Math.floor(Math.random() * data.data.children.length)].data;
                if (random.id === latest) {
                    return randomPost();
                }

                latest = random.id;

                return random;
            };

            let post = randomPost();
            let caption = post.title + ' on '+ redditSite + post.permalink;
            let url = post.url;

            let gifRegex = /\.(gif.*)/gm;
            let isGif = gifRegex.exec(url);

            if ((post.media && post.media.oembed && post.media.oembed.type === 'video') || (isGif && post.preview && post.preview.reddit_video_preview.fallback_url)) {
                bot.sendVideo(msg.chat.id, post.preview.reddit_video_preview.fallback_url, { caption: caption })
                .catch(function (error) {
                    console.log(error, post.preview.reddit_video_preview.fallback_url);
                });
                return;
            }

            bot.sendPhoto(msg.chat.id, url, { caption: caption })
            .catch(function (error) {
                console.log(error, url);
            });
        })
        .catch(function (error) {
            bot.sendMessage(msg.chat.id, '‼️ Ops, ahora no puedo ofrecerte tits, prueba más tarde');
        });
    }
    start () {
        this.bot.on('text', (msg) => { 
            if (msg.text === '!tits') {
                checkCommand(msg.chat.id, 'Tits').then((enabled) => {
                    if (enabled) {
                        this.call(msg);
                        return;
                    }
                    
                    this.bot.sendMessage(msg.from.id, '‼️ Ops, este comando está desactivado en este grupo');
                });
            }
         });
    }
}

module.exports = new Tits();
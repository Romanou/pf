const express = require('express');
const compression = require('compression');
const events = require('events');
const eventEmmitter = new events.EventEmitter();
const config = require('./config.js');
const path = require('path');
const history = require('express-history-api-fallback');
const app = new express();
const fs = require('fs');
const session = require('express-session')({
    secret: 'rrSecretSession', 
    resave: true, 
    saveUninitialized: true
});
const server = require('spdy').createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
},app);
const sharedsession = require("express-socket.io-session");
const io = require('socket.io')(server,{pingTimeout: 7000, pingInterval: 10000, origins: `*:${config.port.https}`});
const cache = require('apicache').middleware;
const bcrypt = require('bcrypt');
const root = `${__dirname}/app`;

app.use(compression());
app.use(session);
app.use('/assets',express.static('app/assets'));
app.use(express.static(root));
app.use(history('index.html', {root}));
if(config.env === 'production') app.use(cache('5 minutes')); //desinstaller 'apicache' si ça fonctionne pas

/**
 * TODO 
 * Creer une redirection http vers https
 */
server.listen(config.port.https,()=>console.log(`Server started and listen on ${config.port.https} port ...`));

io.use(sharedsession(session,{autoSave: true}));
io.on('connection',(socket)=>{
    /**
     * Connexion ...
     */
    let userData = socket.handshake.session.userData;
    if(typeof userData  !== 'undefined'){
        socket.emit('state_connection',{
            state: true,
            data: userData
        });
    } else{
        socket.emit('state_connection',{state: false});
    }

    socket.on('login',(data)=>{
        setTimeout(()=>{
            if(data.id == 'Romanou' && data.password == '123456'){
                socket.handshake.session.userData = {
                    username: 'Romanou',
                    firstname: 'Roman',
                    lastname: 'Ryckebusch',
                    isAdmin: true
                };
                socket.handshake.session.save();
                socket.emit('state_connection',{
                    state: true,
                    data: socket.handshake.session.userData,
                    redirect: {
                        state: true,
                        to: data.redirect ? `/${data.redirect}` : '/'
                    },
                    notification: {
                        msg: `Bienvenue ${data.id} !`,
                        config: {
                            type: 'success'
                        }
                    }
                });
            } else{
                socket.emit('login_failed');
            }
        },1000);
    });

    socket.on('logout',()=>{
        let userData = socket.handshake.session.userData;
        delete socket.handshake.session.userData;
        socket.handshake.session.save();
        socket.emit('state_connection',{
            state: false,
            redirect: {
                state: true,
                to: '/'
            },
            notification: {
                msg: `A bientôt ${userData.username} !`,
                config: {
                    type: 'success'
                }
            }
        });
    });
    /******************/
});
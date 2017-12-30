import utils from './utils';

let loader = (state)=>{
    let laoder = utils.qs('#mainLoader');
    if(loader !== null){
        if(typeof state !== 'undefined' && state === 'show'){
            laoder.classList.add('show');
        } else{
            laoder.classList.remove('show');
        }
    }
};

let notification = {
    state: false,
    waitingLine: [],
    show(msg, config){
        let time = 0;
        if(typeof config === 'object' && typeof config.time === 'number' && config.time > 0){
            time = config.time;
        } else{
            time = 3000;
        }
        if(typeof msg !== 'undefined' && msg !== null && msg !== ''){
            if(!this.state){
                let body = document.body,
                    notifEl = utils.createElement('section',{id:'notification'}),
                    msgEl = utils.createElement('p');

                if(typeof config !== 'undefined' && typeof config.type !== 'undefined'){
                    switch(config.type){
                        case 'error':
                        notifEl.classList.add('error');
                        break;
                        case 'success':
                        notifEl.classList.add('success');
                        break;
                        case 'information':
                        default:
                        notifEl.classList.add('information');
                        break;
                    }   
                } else{
                    notifEl.classList.add('information');
                }
                msgEl.innerHTML = msg;
                notifEl.appendChild(msgEl);
                body.appendChild(notifEl);
                notifEl.focus();
                this.state = true;
                setTimeout(()=>{
                    notifEl.classList.add('hide');
                    setTimeout(()=>{  
                        body.removeChild(notifEl);
                        body.focus();
                    },400);
                    this.state = false;
                    if(this.waitingLine.length > 0){
                        let data = {},
                            index = 0;
                        for(let i in this.waitingLine){
                            data = this.waitingLine[i];
                            index = i;
                            break;
                        }
                        if(typeof data.msg !== 'undefined' && data.msg !== null && data.msg !== ''){
                            if(typeof data.config === 'object'){
                                notification.show(data.msg,{
                                    ...data.config
                                });
                            } else{
                                notification.show(data.msg);
                            }
                        }
                        this.waitingLine.splice(index, 1);
                    }
                },time);
            } else{
                if(typeof config === 'object'){
                    if((typeof config.waitingLine === 'undefined') || (typeof config.waitingLine !== 'undefined' && config.waitingLine)){
                        this.waitingLine.push({msg,config});
                    }
                } else{
                    this.waitingLine.push({msg});
                }
            }
        }
    }
};

export default{
    loader,
    notification
}

window.RR = {
    notification
}
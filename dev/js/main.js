import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import IO from 'socket.io-client';
import config from '../../config';
import VueSocketIO from 'vue-socket.io';
import front from './front/main';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueSocketIO, IO.connect('//localhost:'+config.port.https,{secure: true}));
/**
 * Components
 */
const homeCpn = require('./components/home.vue').default;
const contactCpn = require('./components/contact.vue').default;
const loginCpn = require('./components/connect.vue').default;
const accountCpn = require('./components/account.vue').default;
const notFoundCpn = require('./components/notFound.vue').default;
const createAccountCpn = require('./components/createAccount.vue').default;

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: homeCpn
        },
        {
            path: '/contact',
            component: contactCpn
        },
        {
            path: '/se-connecter',
            component: loginCpn
        },
        {
            path: '/se-connecter/target/:target',
            component: loginCpn
        },
        {
            path: '/mon-compte',
            component: accountCpn
        },
        {
            path: '/creer-un-compte',
            component: createAccountCpn
        },
        {
            path: '*',
            component: notFoundCpn
        }
    ]
});

new Vue({
    el: '#rr-app',
    router,
    render(h){
        return h(require('./App.vue').default);
    }
});
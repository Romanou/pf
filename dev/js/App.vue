<template>
    <section id="rr-app">
        <main-header></main-header>
        <router-view></router-view>
        <main-footer></main-footer>
        <div id="mainLoader" class="loader">
            <img src="/assets/images/logo.svg" alt="Chargement">
            <span>Chargement</span>
        </div>
    </section>
</template>

<script>
import mainHeader from './components/templates/header.vue';
import mainFooter from './components/templates/footer.vue';
import Vuex from 'vuex';
import store from './stores/userStore';
import front from './front/main';

export default {
    name: 'app',
    components: {
        mainHeader,
        mainFooter
    },
    store,
    computed: {
        ...Vuex.mapGetters(['isConnected'])
    },
    methods:{
        ...Vuex.mapActions({
            putOnline: 'putOnline',
            putOffline: 'putOffline',
            putUserData: 'putData',
            clUserData: 'clearData'
        })
    },
    sockets: {
        state_connection(res){
            if(res.state && !this.isConnected){
                this.putOnline();
                this.putUserData(res.data);
            } else if(!res.state && this.isConnected){
                this.putOffline();
                this.clUserData();
            }
            if(res.redirect && res.redirect.state){
                this.$router.push(res.redirect.to);
            }
            front.loader('hide');
            if(res.notification && res.notification.msg){
                if(res.notification.config){
                    front.notification.show(res.notification.msg,res.notification.config);
                } else{  
                    front.notification.show(res.notification.msg);
                }
            }
        }
    }
}
</script>
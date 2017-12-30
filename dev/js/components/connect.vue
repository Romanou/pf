<template>
    <main>
        <h1 v-if="!isConnected">Connectez-vous</h1>
        <h1 v-else>Vous êtes déjà connecté ...</h1>
        <div v-if="!isConnected">
            <form>
                <label for="user-id">Identifiant</label>
                <input v-model="userID" id="user-id" name="user-id" type="text" placeholder="Votre pseudonyme ou adresse mail" required>
                <label for="user-password">Mot de passe</label>
                <input v-model="userPassword" id="user-password" name="user-password" type="password" placeholder="Votre mot de passe" required>
                <input type="submit" @click.prevent="connect">
            </form>
            <router-link to="/creer-un-compte" class="link">S'inscrire</router-link>
        </div>
        <p v-else>
            Voulez-vous vous <a href="" @click.prevent="logout" class="link">déconnecter</a> ?
        </p>
    </main>
</template>

<script>
import Vuex from 'vuex';
import store from '../stores/userStore';
import front from '../front/main';

export default {
    name: 'connection',
    store,
    data(){
        return {
            userID : '',
            userPassword : ''
        }
    },
    computed: {
        ...Vuex.mapGetters({   
            isConnected: 'isConnected',
            userData: 'data'
        })
    },
    sockets: {
        login_failed(){
            front.notification.show('Les identifiants saisis sont érronés !',{
                type: 'error'
            });
            front.loader('hide');
        }
    },
    methods: {
        ...Vuex.mapActions({
            putOnline: 'putOnline',
            putUserData: 'putData'
        }),
        connect(){
            if(this.userID !== '' && this.userPassword !== ''){
                front.loader('show');
                let userData = {
                    id: this.userID,
                    password: this.userPassword
                };
                if(typeof this.$route.params.target !== 'undefined' && this.$route.params.target !== null){
                    userData.redirect = this.$route.params.target;
                }
                this.$socket.emit('login',userData);
            } else{
                front.notification.show('Entrez vos identifiant',{
                    type: 'error',
                    waitingLine: false
                });
            }
        },
        logout(){
            this.$socket.emit('logout');
        }
    }
}
</script>

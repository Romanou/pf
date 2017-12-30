<template>
    <main>
        <h1>Mon compte</h1>
        <section v-if="isConnected">
            <a href="" @click.prevent="logout" class="link">Se déconnecter</a>
            <div>
                <span></span>
            </div>
        </section>
        <p v-else>
            <router-link to="/se-connecter/target/mon-compte" class="link">Connectez-vous</router-link> si vous voulez accéder à votre compte.
        </p>
    </main>
</template>

<script>
import Vuex from 'vuex';
import store from '../stores/userStore';

export default {
    name: 'account',
    store,
    computed: {
            ...Vuex.mapGetters({
                isConnected: 'isConnected',
                userData: 'data'
            })
    },
    methods: {
        logout(){
            this.$socket.emit('logout');
        }
    }
}
</script>

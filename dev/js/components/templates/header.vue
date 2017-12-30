<template>
    <header>
        <nav>
            <router-link to="/">
                <img src="/assets/images/logo.svg" alt="Accueil du site">
                <p class="hidden-message">Roman Ryckebush</p>
            </router-link>
            <ul>
                <li>
                    <router-link to="/">
                        Accueil
                    </router-link>
                </li>
                <li>
                    <router-link to="/contact">
                        Contact
                    </router-link>
                </li>
                <li v-if="isConnected">
                    <router-link to="/mon-compte">
                        Mon compte
                    </router-link>
                </li>
                <li v-else>
                    <router-link to="/se-connecter">
                        Se connecter
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import Vuex from 'vuex';
import store from '../../stores/userStore';

export default {
  name: 'mainHeader',
  store,
  computed: {
    ...Vuex.mapGetters({
        isConnected: 'isConnected',
        userData: 'data'
    })
  }
}
</script>

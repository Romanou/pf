<template>
    <main>
        <div v-if="!isConnected">
            <form @submit.prevent="subscribe">
                <label for="pseudonyme">Pseudonyme</label>
                <input type="text" name="pseudonyme" placeholder="Votre pseudonyme" v-model="userData.username" min="4" max="25" required>
                <label for="prenom">Prénom</label>
                <input type="text" name="prenom" placeholder="Votre prénom" v-model="userData.firstname" min="2" max="25" required>
                <label for="nom">Nom</label>
                <input type="text" name="nom" placeholder="Votre nom" v-model="userData.surname" min="2" max="25" required>
                <label for="mail">Adresse email</label>
                <input type="email" name="mail" placeholder="Votre adresse mail" v-model="userData.mail" min="2" max="100" required>
                <label for="password">Mot de passe</label>
                <input type="password" name="password" placeholder="Votre mot de passe" v-model="userData.password" min="8" max="40" required>
                <label for="passwordRepeat">Répetez le mot de passe</label>
                <input type="password" name="passwordRepeat" placeholder="Répetez votre mot de passe" v-model="userData.passwordRepeat" min="8" max="40" required>
                <input type="submit" value="S'inscrire">
            </form>
            <p>
                Déjà un compte ? <br>
                <router-link to="/se-connecter" class="link">Se connecter</router-link>
            </p>
        </div>
        <p v-else>
            Vous possédez déjà un compte. <br>
            Se rendre sur l'<router-link to="/" class="link">accueil</router-link>.
        </p>
    </main>
</template>

<script>
import Vuex from 'vuex';

export default {
    data(){
        return {
            userData : {
                username : '',
                firstname : '',
                surname : '',
                mail : '',
                password : '',
                passwordRepeat : ''
            }
        }
    },
    methods : {
        subscribe(){
            console.log(this.userData);
        }
    },
    computed: {
        ...Vuex.mapGetters(['isConnected'])
    }
}
</script>

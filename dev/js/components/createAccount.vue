<template>
    <main>
        <div v-if="!isConnected">
            <form>
                <label for="pseudonyme">Pseudonyme</label>
                <input type="text" name="pseudonyme" placeholder="Votre pseudonyme" required>
                <label for="prenom">Prénom</label>
                <input type="text" name="prenom" placeholder="Votre prénom" required>
                <label for="nom">Nom</label>
                <input type="text" name="nom" placeholder="Votre nom" required>
                <label for="mail">Adresse email</label>
                <input type="text" name="mail" placeholder="Votre adresse mail" required>
                <label for="password">Mot de passe</label>
                <input type="text" name="mail" placeholder="Votre mot de passe" required>
                <label for="password">Répetez le mot de passe</label>
                <input type="text" name="mail" placeholder="Répetez votre mot de passe" required>
                <input type="submit" value="S'inscrire">
            </form>
            <p>
                Déjà un compte ? <br>
                <router-link to="/se-connecter" class="link">Se connecter</router-link>
            </p>
        </div>
        <p v-else>
            Vous possédez déjà un compte. <br>
            Se rendre sur l'<router-link to="/" class="link">accueil</router-link>
        </p>
    </main>
</template>

<script>
import Vuex from 'vuex';

export default {
    computed: {
        ...Vuex.mapGetters(['isConnected'])
    }
}
</script>

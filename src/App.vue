<script setup>
// libreria de vue que nos permite hacer el enrutado de una vista a otra
// router link es nativo de vue y funciona como href 
// routerlink nos permite navegar entre diferentes paginas de nuestra aplicacion
import { RouterLink, RouterView } from 'vue-router'
import { auth } from '@/firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false)
const router = useRouter()

onAuthStateChanged(auth, (user) =>{
  isAuthenticated.value = !!user
})


const logout = async () => {
  await signOut(auth)
  isAuthenticated.value = false
  router.push('/auth')
}

</script>

<template>
  <header>

    <div>
      <nav v-if="isAuthenticated">
        <RouterLink to="/" class="dash">Dashboard</RouterLink>
        <!-- auth nos servira para la autenticación -->
        <RouterLink to="/transactions" class="transaccion">Transacción</RouterLink>
        <button @click="logout" class="btn">Salir</button>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
  <!-- routherview gestiona el enrutado -->
  <!-- routherview muestra lo que esta en el componente router indexjs -->
 
</template>

<style scoped>

main{
  text-align: left;
  margin-top: 3rem;
}

.btn {
    padding-left: 30px;
    padding-right: 30px;
    background-color: #374375;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    cursor: pointer;
}

.transaccion, .dash{
  color:#515565;
}


nav {
  width: 100%;
  font-family: sans-serif;
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  font-size: 1.2rem;
}
</style>


/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */


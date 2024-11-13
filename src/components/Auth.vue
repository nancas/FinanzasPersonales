<!-- <script setup>
    import { ref } from 'vue'
    // import { auth } from '@/firebase.js';
    import { useRouter} from 'vue-router';
    import { useAuth } from '@/composables/useAuth.js';
    
    const isLogin = ref(true)
    const email = ref('')
    const password = ref('')
    const router = useRouter('')
    const username =ref('')

    const {login, register, signInWithGoogle}=useAuth()

    const toggleAuht = () => {
        isLogin.value = !isLogin.value
    }

    const handleSubmit = async() => {
        try {
            if(isLogin.value){
                await login(email.value, password.value)
            }
            else{
                await register(email.value, password.value, username.value)
            }
            router.push('/')
        } catch (error) {
            
        }
    }

</script>


<template>
    <div>
        <h1>{{ isLogin ? "Iniciar Sesión" : "Registro" }}</h1>
        <form @submit.prevent="handleSubmit">
            <div class="inputs">
                <div v-if="!isLogin">

                    <label for="username">Username</label>
                    <input id="username" v-model="username" type="text" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input id="email" v-model="email" type="email" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" v-model="password" type="password" required>
                </div>
            <button @click="signInWithGoogle">Iniciar sesión con Google</button>
            </div>
            <button type="submit">{{ isLogin ? "Iniciar Sesión" : "Registrarse" }}</button>
        </form>
        <p @click="toggleAuht" style="cursor: pointer;">
            {{ isLogin ? "¿Aún no tienes una cuenta?" :"¿Ya tienes una cuenta? Inicia sesión" }}
        </p>
    </div>
</template>

<style scoped>
.inputs{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-left: 8rem;
    padding-right: 8rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
}
input{
    width: 100%;
    padding: 0.6rem;

}
label{
    display: block;
    text-align: left;

}
</style> -->

<template>
    <div class="Bienvenida">
        <h1>WalletWise</h1>
        <p>¡Hola! Nos alegra verte. Explora nuestras herramientas y recursos diseñados para tu éxito financiero</p>
    </div>
    <div class="auth-container">
        <h2 class="h2">{{ isLogin ? "Iniciar Sesión" : "Registro" }}</h2>
        <form @submit.prevent="handleSubmit" class="auth-form">
            <div class="inputs">
                <div v-if="!isLogin">
                    <label for="username">Username</label>
                    <input id="username" v-model="username" type="text" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input id="email" v-model="email" type="email" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" v-model="password" type="password" required>
                </div>

            </div>
            <button type="submit" class="btn-submit">{{ isLogin ? "Iniciar Sesión" : "Registrarse" }}</button>
            <button @click="signInWithGoogle" class="btn-google">Iniciar sesión con Google</button>
        </form>
        <p @click="toggleAuht" class="toggle-auth">
            {{ isLogin ? "¿Aún no tienes una cuenta?" :"¿Ya tienes una cuenta? Inicia sesión" }}
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth.js';

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const username = ref('');
const router = useRouter();
const { login, register, signInWithGoogle } = useAuth();

const toggleAuht = () => {
    isLogin.value = !isLogin.value;
}

const handleSubmit = async() => {
    try {
        if(isLogin.value){
            await login(email.value, password.value);
        } else {
            await register(email.value, password.value, username.value);
        }
        router.push('/');
    } catch (error) {
        // Manejar el error
    }
}
</script>

<style scoped>
.Bienvenida{
    text-align: center;
    font-family: sans-serif;
    color: #515565;
    margin-bottom: 30px;
}

.h2{
    color: #515565;
    font-size: 20px;


}

.auth-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 30px;
    background-color:gainsboro;
    border-radius: 18px;
    text-align: center;
}

.auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 15px;
    background-color: white;
}

label {
    display: block;
    text-align: left;
    color:#515565;
    font-size: 15px;
}

.btn-submit {
    width: 100%;
    padding: 0.8rem 1.2rem;
    background-color: #b4bde2;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: #515565;
    cursor: pointer;
}

.btn-submit:hover {
    background-color: #7c7d80;
    color: white;
}

.btn-google {
    padding: 0.8rem 1.2rem;
    background-color: #374375;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-google:hover {
    background-color: #7c7d80;
    color: white;
}

.toggle-auth {
    cursor: pointer;
    color: #515565;
    margin-top: 1rem;
}

</style>

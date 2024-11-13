<template>
    <p>Por favor, ingresa la transacción</p>
    <form @submit.prevent="addTransaction" class="transaction-form">
        <div class="form-group">
            <label>Tipo de transacción</label>
            <select v-model="type" required>
                <option value="ingresos">Ingreso</option>
                <option value="gasto">Gasto</option>            
            </select>      
        </div>
        <div class="form-group">
            <label>Cantidad</label>
            <input v-model="amount" type="number" required>
        </div>
        <button type="submit" class="btn-submit">Agregar transacción</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { auth } from '@/firebase.js';

const type = ref('ingresos');
const amount = ref(0);
const db = getDatabase();

const addTransaction = async () => {
    const user = auth.currentUser;
    if (user && amount.value != null) {
        const transactionRef = dbRef(db, `transactions/${user.uid}`);

        const newTransaction = {
            type: type.value,
            amount: amount.value,
            date: new Date().toISOString().slice(0, 10),
            userId: user.uid
        };
        await push(transactionRef, newTransaction);
        alert('Transacción añadida');
        amount.value = null;
    } else {
        alert('Debes ingresar una cantidad válida');
    }
};
</script>

<style scoped>

.transaction-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 30px;
    background-color: gainsboro;
    border-radius: 18px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display:block;
    color: #515565;
    font-size: 15px;
    text-align: center;
}

.form-group select,
.form-group input {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    background-color:white;
}

.btn-submit {
    width: 100%;
    padding: 12px;
    background-color: #374375;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    cursor: pointer;
}
.btn-submit:hover {
    background-color: #7c7d80;
    color: white;
}

p {
    text-align: center;
    color: #515565;
    font-family: sans-serif;
    margin-bottom: 30px;
}
</style>

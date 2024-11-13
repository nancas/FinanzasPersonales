<template>
    <h2 v-if="user" class="welcome-message">Bienvenido(a), {{ user.displayName }}</h2>
    <div v-if="chartData && chartData.labels.length > 0" class="chart-container">
        <BarChart :chartData="chartData"/>
    </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth.js';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { onMounted, ref } from 'vue';
import { auth } from '@/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import BarChart from './BarChart.vue';

const { user } = useAuth();

const chartData = ref({
    labels: [],
    datasets: [
        {
            label: "Gastos",
            backgroundColor: "rgb(55,67,117)",
            data: []
        },
        {
            label: "Ingresos",
            backgroundColor: "rgb(137,81,89)",
            data: []
        }
    ]
});

// INICIALIZAR LA BASE DE DATOS
const db = getDatabase();

// FUNCION PARA OBTENER LOS DATOS DE LAS TRANSACCIONES
const fetchData = (userUid) => {
    // referencia a las transacciones del usuario registrado 
    const transactionRef = dbRef(db, `transactions/${userUid}`);

    onValue(transactionRef, (snapshot) => {
        const data = snapshot.val();
        // si no hay data if se convierte en true y ejecuta return
        if (!data) return console.log("No hay datos");
        const labels = [];
        const ingresos = [];
        const gastos = [];

        // el for permite ir por cada uno de las transacciones, ver si es un ingreso o un gasto y guardarlo en su respectiva  const
        for (const key in data) {
            const { type, amount, date } = data[key];
            labels.push(new Date(date).toLocaleDateString());

            if (type === 'ingresos') {
                ingresos.push(amount);
            } else if (type === 'gasto') {
                gastos.push(amount);
            }
        }
        chartData.value.labels = labels;
        chartData.value.datasets[0].data = gastos;
        chartData.value.datasets[1].data = ingresos;
    });
};

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userUid = auth.currentUser.uid;
            fetchData(userUid);
        } else {
            console.log("No hay un usuario autenticado");
        }
    });
});
</script>

<style scoped>

.welcome-message {
    text-align: center;
    color: #515565;
    margin-bottom: 20px;
    font-size: 20px;
}

.chart-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: gainsboro;
    text-align: center;
    border-radius: 18px;

}
</style>




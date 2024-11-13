<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as chartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale  } from 'chart.js';

chartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
    chartData: {
        type: Object,
        required: true
    }
})

// console.log(props.chartData);
</script>



<template>
    <div v-if="chartData && chartData.labels.length > 0">
        <Bar :data="chartData"/>
    </div>
</template>
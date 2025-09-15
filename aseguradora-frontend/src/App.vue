<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PolizaForm from "./components/PolizaForm.vue";
import PolizaList from "./components/PolizaList.vue";

const polizas = ref([]);

async function fetchPolizas() {
  const res = await axios.get("http://localhost:4000/api/polizas");
  polizas.value = res.data;
}

onMounted(fetchPolizas);
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center p-6">
    <h1 class="text-3xl font-bold text-blue-700 mb-6">📑 Aseguradora - Gestión de Pólizas</h1>
    <PolizaForm @refresh="fetchPolizas"/>
    <PolizaList :polizas="polizas" @refresh="fetchPolizas"/>
  </div>
</template>


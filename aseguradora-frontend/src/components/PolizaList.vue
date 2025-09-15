<script setup>
import axios from "axios";
const props = defineProps({ polizas: Array });
const emit = defineEmits(["refresh"]);

async function eliminar(id) {
  await axios.delete(`http://localhost:4000/api/polizas/${id}`);
  emit("refresh");
}
</script>
<template>
  <div class="w-full max-w-3xl">
    <h2 class="text-xl font-semibold mb-4">📋 Lista de Pólizas</h2>
    <table class="w-full bg-white shadow-md rounded overflow-hidden">
      <thead class="bg-blue-600 text-white">
        <tr>
          <th class="px-4 py-2">Número</th>
          <th class="px-4 py-2">Tipo</th>
          <th class="px-4 py-2">Titular</th>
          <th class="px-4 py-2">Monto</th>
          <th class="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in polizas" :key="p._id" class="border-b hover:bg-gray-50">
          <td class="px-4 py-2">{{ p.numeroPoliza }}</td>
          <td class="px-4 py-2">{{ p.tipoSeguro }}</td>
          <td class="px-4 py-2">{{ p.titular }}</td>
          <td class="px-4 py-2">${{ p.monto }}</td>
          <td class="px-4 py-2 flex gap-2">
            <button @click="eliminar(p._id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">🗑</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



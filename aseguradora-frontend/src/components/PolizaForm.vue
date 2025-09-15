<script setup>
import axios from "axios";
import { reactive } from "vue";

const emit = defineEmits(["refresh"]);

const form = reactive({
  numeroPoliza: "",
  tipoSeguro: "",
  titular: "",
  monto: ""
});

async function crearPoliza() {
  await axios.post("http://localhost:4000/api/polizas", form);
  emit("refresh");
  Object.assign(form, { numeroPoliza: "", tipoSeguro: "", titular: "", monto: "" });
}
</script>


<template>
  <form @submit.prevent="crearPoliza" class="bg-white shadow-lg rounded p-4 mb-6 w-full max-w-md">
    <h2 class="text-xl font-semibold mb-4">➕ Crear Nueva Póliza</h2>
    
    <input v-model="form.numeroPoliza" type="text" placeholder="Número de Póliza" class="border border-gray-300 rounded w-full p-2 mb-3" required />
    <select v-model="form.tipoSeguro" class="input" required>
      <option disabled value="">Seleccione tipo de seguro</option>
      <option>Auto</option>
      <option>Vida</option>
      <option>Hogar</option>
      <option>Salud</option>
    </select>
    <input v-model="form.titular" type="text" placeholder="Titular" class="input" required />
    <input v-model="form.monto" type="number" placeholder="Monto" class="input" required />

    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
      Guardar
    </button>
  </form>
</template>



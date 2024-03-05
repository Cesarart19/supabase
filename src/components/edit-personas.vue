<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Agregar persona</h1>
    <form @submit.prevent="agregarPersona">
      <div class="mb-4">
        <label for="nombre" class="block font-bold mb-1"
          >Nombre del la persona:</label
        >
        <input
          type="text"
          id="nombre"
          v-model="nombre"
          class="block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="mb-4">
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Agregar País
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createClient } from "@supabase/supabase-js";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
  // Otras rutas aquí...
  {
    path: "/edit-personas/:id",
    name: "EditPersonas",
    component: () => import("./edit-personas.vue"), // Asegúrate de especificar la ubicación correcta de tu componente edit-personas
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Configura la instancia de Supabase
const supabase = createClient(
  "https://dhmcbjnfgxziahetkohm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobWNiam5mZ3h6aWFoZXRrb2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NjYzOTgsImV4cCI6MjAyNDU0MjM5OH0.z_kNRQwYvOtPg35PZJYzFqPhjb8ExQsxELnijPUH9Ag"
);

const nombre = ref("");

// Función para agregar una nueva parsona
const agregarPersona = async () => {
  try {
    // Validar que el campo del nombre no esté vacío
    if (!nombre.value.trim()) {
      alert("Por favor, ingrese un nombre válido para el país.");
      return;
    }

    // Insertar el nueva persona en la tabla de Supabase
    const { error } = await supabase
      .from("personas")
      .insert({ name: nombre.value });

    if (error) {
      throw error;
    }

    alert("¡Persona agregada correctamente!");
    // Limpiar el campo de entrada después de agregar la persona
    nombre.value = "";
  } catch (error) {
    console.error("Error al agregar el persona:", error.message);
    alert(
      "Ocurrió un error al agregar la persona. Por favor, inténtelo de nuevo."
    );
  }
};

export default router;

</script>

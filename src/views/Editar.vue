<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Editar Usuario {{ id }}</h1>
    <form @submit.prevent="agregarNuevoUsuario">
      <div class="mb-4">
        <label for="nombre" class="block font-bold mb-1">Nombre: </label>
        <input
          type="text"
          id="nombre"
          v-model="nombre"
          class="block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="mb-4">
        <button
          @click="editarUsuario"
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Guardar Usuario
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useRoute } from "vue-router"; // Importa useRoute

const route = useRoute(); // Usa useRoute para acceder a la ruta actual
const id = ref(route.params.id); // Accede al parámetro id de la ruta

// Configura la instancia de Supabase
const supabase = createClient(
  "https://dhmcbjnfgxziahetkohm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobWNiam5mZ3h6aWFoZXRrb2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NjYzOTgsImV4cCI6MjAyNDU0MjM5OH0.z_kNRQwYvOtPg35PZJYzFqPhjb8ExQsxELnijPUH9Ag"
);

const nombre = ref("");
const router = useRouter();

const lectura = async () => {
  try {
    console.log(typeof id)
    const { data, error } = await supabase.from("personas").select().eq("id", id.value);
    
    if (error) {
      console.log(error);
      throw new Error(error.message);
    } else {
      console.log(data[0].nombre); //Pepito pote
       nombre.value = data[0].nombre
    }
    // products.value = data || [];
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
  }
};

lectura();

const editarUsuario = async () => {
  console.log("editarUsuario");
  try {
    // Validar que el campo del nombre no esté vacío
    if (!nombre.value.trim()) {
      alert("Por favor, ingrese un nombre válido.");
      return;
    }

    // Edite el nuevo usuario en la tabla de Supabase

    const { data, error } = await supabase
      .from("personas")
      .update({ nombre: nombre.value })
      .eq("id", id.value);

    if (error) {
      throw error;
    }

    console.log("Usuario editado correctamente:", data);

    // Redirigir a la página principal después de editar exitosamente un nuevo usuario
    router.push("/");
  } catch (error) {
    console.error("Error al editar un nuevo usuario:", error);
    // Manejar cualquier error que ocurra al agregar un nuevo usuario
  }
};
</script>

<style>
/* Estilos opcionales para mejorar la apariencia del formulario */
input[type="text"],
button {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
input[type="text"]:focus {
  outline: none;
  border-color: #4c51bf;
}
button {
  background-color: #4c51bf;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background-color: #4338ca;
}
</style>

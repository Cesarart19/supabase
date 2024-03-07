<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Agregar Nuevo Usuario</h1>
    <form @submit.prevent="agregarNuevoUsuario">
      <div class="mb-4">
        <label for="nombre" class="block font-bold mb-1">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="nombre"
          class="block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="mb-4">
        <label for="avatar" class="block font-bold mb-1">Avatar:</label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          @change="handleFileUpload"
          class="block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="mb-4">
        <button
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
import { useRouter } from "vue-router";
import { createClient } from "@supabase/supabase-js";

// Configura la instancia de Supabase
const supabase = createClient(
  "https://dhmcbjnfgxziahetkohm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobWNiam5mZ3h6aWFoZXRrb2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NjYzOTgsImV4cCI6MjAyNDU0MjM5OH0.z_kNRQwYvOtPg35PZJYzFqPhjb8ExQsxELnijPUH9Ag"
);

const nombre = ref("");
const router = useRouter();
let avatarFile = null;

const agregarNuevoUsuario = async () => {
  try {
    // Validar que el campo del nombre no esté vacío
    if (!nombre.value.trim()) {
      alert("Por favor, ingresa un nombre válido.");
      return;
    }

    // Cargar el archivo de avatar al bucket 'avatars'
    const { data: avatarData, error: avatarError } = await supabase.storage
      .from("avatars")
      .upload(`avatars/${avatarFile.name}`, avatarFile);


      // console.log(data)
      console.log()

    if (avatarError) {
      throw avatarError;
    }

    // Obteniendo la URL del archivo cargado
    // const avatarUrl = avatarData.path;

    // Insertar el nuevo usuario en la tabla de Supabase
    const { data, error } = await supabase
      .from("personas")
      .insert({ nombre: nombre.value, avatarData });

    console.log("Usuario agregado correctamente:", data);

    // Redirigir a la página principal después de agregar exitosamente un nuevo usuario
    router.push("/");
  } catch (error) {
    console.error("Error al agregar un nuevo usuario:", error);
    // Manejar cualquier error que ocurra al agregar un nuevo usuario
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  avatarFile = file;
  return { agregarNuevoUsuario, avatarFile };
};
</script>

<style>
/* Estilos opcionales para mejorar la apariencia del formulario */
input[type="text"],
input[type="file"],
button {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
input[type="text"]:focus,
input[type="file"]:focus {
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

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { almacenCart } from "../stores/cart";
import type { Product } from "../stores/products";
import { toCurrency } from "../shared/utils";
import { createClient } from "@supabase/supabase-js"; // Importa createClient de Supabase

// Configura la instancia de Supabase
const supabase = createClient(
  "https://dhmcbjnfgxziahetkohm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobWNiam5mZ3h6aWFoZXRrb2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NjYzOTgsImV4cCI6MjAyNDU0MjM5OH0.z_kNRQwYvOtPg35PZJYzFqPhjb8ExQsxELnijPUH9Ag"
);

export default defineComponent({
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const cart = almacenCart();

    const editPersona = (productId: number) => {
      router.push(`/editar/${productId}`);
    };

    const removeProduct = async (productId: number) => {
  try {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar este usuario 🤨?");
    if (confirmed) {
      const { error } = await supabase
        .from("personas")
        .delete()
        .eq("id", productId);
      if (error) {
        throw error;
      }
      console.log(`Persona con ID ${productId} eliminado correctamente`);
      window.location.reload();
      // Aquí podrías recargar la lista de productos u otra lógica necesaria después de eliminar el producto
    } else {
      console.log("Eliminación cancelada por el usuario");
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);  
  }
};

    const addNewPerson = () => {
      router.push("/formulario"); 
    };

    return { removeProduct, editPersona, addNewPerson, toCurrency };
  },
});
</script>

<template>
  <div class="card bordered">
    <div class="card-body">
      <h2 class="card-title">
        <router-link class="link link-hover" :to="`/product/${product.id}`">{{
          product.nombre
        }}</router-link>
      </h2>
      <p>{{ toCurrency(product.price) }}</p>
      <div class="justify-end card-actions">
        <button class="btn btn-warning" @click="editPersona(product.id)"> 
          Editar a {{ product.nombre }}
        </button>
        <button class="btn btn-danger" @click="removeProduct(product.id)">
          Eliminar a {{ product.nombre }}
        </button>
      </div>
    </div>
  </div>
</template>

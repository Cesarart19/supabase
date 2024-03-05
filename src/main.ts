import { createClient } from "@supabase/supabase-js";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index";
import "./index.css";

import { supabase } from "./lib/supabase";
import { userSession } from "@/lib/useAuth";

const app = createApp(App);
// const supabase = createClient(
//   "https://dhmcbjnfgxziahetkohm.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobWNiam5mZ3h6aWFoZXRrb2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NjYzOTgsImV4cCI6MjAyNDU0MjM5OH0.z_kNRQwYvOtPg35PZJYzFqPhjb8ExQsxELnijPUH9Ag"
// );

app.use(createPinia());
app.use(router);
app.config.globalProperties.$supabase = supabase;
app.mount("#app");
/**
 * Realiza un seguimiento de si el usuario ha iniciado o no sesión
 * y actualizará el estado de la sesión de usuario en consecuencia.
 */
supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session;
  // console.log(session);
  // console.log(userSession.value);
  // console.log(userSession);
});

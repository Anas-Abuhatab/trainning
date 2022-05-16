import { createApp } from 'vue';
import App from './App.vue';
import RegistrationandLogin from './components/RegistrationandLogin';


const app = createApp(App);
app.component('Registration-and-Login',RegistrationandLogin);
app.mount('#app');

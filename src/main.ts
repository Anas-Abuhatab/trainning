import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { initializeApp } from 'firebase/app';
import router from '@/router/index';
import store from './store';
import BaseButton from './components/UI/BaseButton.vue';
import BaseCard from './components/UI/BaseCard.vue';
import NavBar from './components/pages/NavBar.vue';
import TheFooter from './components/pages/TheFooter.vue';
import App from './App.vue';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAR4Nn3uCtS5acefQWXkoEJVsBhRIoHads',
  authDomain: 'hidden-slice-325816.firebaseapp.com',
  databaseURL: 'https://hidden-slice-325816-default-rtdb.firebaseio.com',
  projectId: 'hidden-slice-325816',
  storageBucket: 'gs://hidden-slice-325816.appspot.com',
  messagingSenderId: '789894030715',
  appId: '1:789894030715:web:8c82198cae745e649349de',
};

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(VueAxios, axios);
app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);
app.component('NavBar', NavBar);
app.component('TheFooter', TheFooter);
app.use(router);
app.use(store);
app.mount('#app');

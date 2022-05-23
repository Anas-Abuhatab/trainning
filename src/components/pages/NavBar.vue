<template>
  <div id="all">
    <div id="main">
      <div id="account">
        <img src="../../assets/mail-icon.png" alt="" />
        <span>email</span>
        <img src="../../assets/4-2-phone-download-png.png" alt="" />
        <span>+1 123 456 789</span>
      </div>
      <div id="social">
        <img src="../../assets/fb-icon.png" alt="" />
        <img src="../../assets/twit-icon.png" alt="" />
        <img src="../../assets/insta-icon.png" alt="" />
      </div>
    </div>
    <hr style="width: 100%" size="3" color="black" />
    <section>
      <div id="name">
        <h1>Anas Blog</h1>
      </div>
      <div id="nav">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/article">Article</router-link></li>
          <li><router-link to="/test">Contact Us</router-link></li>
          <li v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/" @click="logOutHandler">LogOut</router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const logOutHandler = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};
</script>

<style lang="scss" scoped>
#all {
  display: flex;
  flex-flow: column;
}
#main {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
#main img {
  width: 20px;
}
#social {
  display: flex;
  margin-right: 10%;
  gap: 10px;
}

#account {
  display: flex;
  margin-left: 10%;
  gap: 10px;
}
section {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: baseline;
}
#name {
  display: flex;
  margin-left: 10%;
  font-size: 25px;
}
#name h1{
  margin: 0;
}
#nav {
  display: flex;
  margin-right: 10%;

}
ul {
  display: flex;
  gap: 30px;
  flex-flow: row wrap;
  list-style-type: none;
  padding: 0;
  overflow: hidden;
}

li a {
  color: #123c69;
  text-align: center;
  font-size: 25px;
  text-decoration: none;
}
</style>

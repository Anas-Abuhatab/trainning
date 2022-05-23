<template>
  <div>
    <form @submit.prevent="submitLoginForm">
      <h1>Login To Anas Blog</h1>
      <p>Login to get access to Create, Update and write comment on All Articles</p>
      <div class="form-control" :class="{ invalid: EmailValidityG === 'invalid' }">
        <label for="email"
          >Email
          <input id="email" name="email" type="email" v-model="email" />
        </label>
        <p v-if="EmailValidityG === 'invalid'">Please Enter a valid Email</p>
      </div>
      <div class="form-control" :class="{ invalid: passwordValidityG === 'invalid' }">
        <label for="how-video"
          >Password
          <input id="password" name="password" type="password" v-model="password" />
        </label>
        <p v-if="passwordValidityG === 'invalid'">Please Enter a valid password</p>
        <p v-if="errMsg">{{ errMsg }}</p>
      </div>
      <div>
        <base-button>Login</base-button>
      </div>
      <div>
        <h2>Don't Have Acount?</h2>
        <router-link to="/signup">SignUP Now</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      accounts: null,
      filterd: null,
      router: useRouter(),
      errMsg: '',
    };
  },
  methods: {
    submitLoginForm() {
      if (this.email === '') {
        this.EmailValidityA({ value: 'invalid' });
      } else if (this.password.match('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$')) {
        this.EmailValidityA({ value: 'valid' });
        this.passwordValidityA({ value: 'invalid' });
      } else {
        // this.accounts = res.data;
        // const toArray = Object.entries(this.accounts).map((e) => ({ [e[0]]: e[1] }));
        signInWithEmailAndPassword(getAuth(), this.email, this.password)
          .then((res) => {
            this.passwordValidityA({ value: 'Pending' });
            this.EmailValidityA({ value: 'Pending' });
            this.router.push('./');
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/invalid-email':
                this.errMsg = 'Invalid Email';
                break;
              case 'auth/user-not-found':
                this.errMsg = 'No Accont with that email found';
                break;
              case 'auth/wrong-password':
                this.errMsg = 'Incorrect Password';
                break;
              default:
                this.errMsg = 'Email or Password Incorrect';
                break;
            }
          });
      }
    },
    ...mapActions([
      'registerA',
      'userNameValidityA',
      'passwordValidityA',
      'confirmpasswordValidityA',
      'loggedinA',
      'EmailValidityA',
    ]),
  },
  computed: {
    ...mapGetters([
      'registerG',
      'emailG',
      'loggedinG',
      'userNameValidityG',
      'passwordValidityG',
      'confirmpasswordValidityG',
      'EmailValidityG',
    ]),
  },
});
</script>

<style lang="scss" scoped>
form {
  font-size: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  flex: 1;
}

.form-control {
  margin: 0.5rem 0;
}

.form-control.invalid input {
  border-color: red;
}

.form-control.invalid label {
  color: red;
}

label {
  font-weight: bold;
}

h2 {
  margin: 0.5rem 0;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

select {
  width: auto;
}

input[type='checkbox'],
input[type='radio'] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
}

button,
a {
  font: inherit;
  border: 1px solid #000000;
  background-color: #000000;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  text-decoration: none;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>

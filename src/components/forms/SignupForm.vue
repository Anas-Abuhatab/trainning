<template>
  <div id="main">
    <div>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: userNameValidityG === 'invalid' }">
          <label for="user-name"
            >User Name
            <input id="user-name" name="user-name" type="text" v-model.trim="userName" />
          </label>
          <p v-if="userNameValidityG === 'invalid'">Please Enter a valid User Name</p>
        </div>
        <div class="form-control" :class="{ invalid: EmailValidityG === 'invalid' }">
          <label for="email"
            >Email
            <input id="email" name="email" type="email" v-model="email" />
          </label>
          <p v-if="EmailValidityG === 'invalid'">Please Enter a valid Email</p>
        </div>
        <div class="form-control">
          <h2>Gender</h2>
          <div>
            <label for="male"
              >Male

              <input id="male" type="radio" value="male" v-model="gender" />
            </label>
          </div>
          <div>
            <label for="female"
              >Female

              <input id="female" type="radio" value="female" v-model="gender" />
            </label>
          </div>
        </div>
        <div class="form-control">
          <h2>Role</h2>
          <div>
            <label for="frontEnd"
              >FrontEnd Developer

              <input id="frontEnd" type="radio" value="FrontEnd Developer" v-model="role" />
            </label>
          </div>
          <div>
            <label for="backEnd"
              >BackEnd Developer

              <input id="backEnd" type="radio" value="BackEnd Developer" v-model="role" />
            </label>
          </div>
          <div>
            <label for="mobile"
              >Mobile Developer

              <input id="Mobile" type="radio" value="Mobile Developer" v-model="role" />
            </label>
          </div>
          <div>
            <label for="design"
              >UX/UI Designer
              <input id="design" type="radio" value="UX/UI Designer" v-model="role" />
            </label>
          </div>
        </div>
        <div class="form-control" :class="{ invalid: passwordValidityG === 'invalid' }">
          <label for="how-video"
            >Password
            <div>
              <input id="password" name="password" type="password" v-model.trim="password" />
              <p v-if="passwordValidityG === 'invalid'">
                Please Enter a valid password
                <ul>
                  <li>At least one upper case English letter</li>
                  <li>At least one lower case English letter</li>
                  <li>At least one digit (1-9)</li>
                  <li>At least one special character</li>
                  <li>Minimum eight in length</li>
                </ul>
              </p>
            </div>
          </label>
        </div>
        <div class="form-control" :class="{ invalid: confirmpasswordValidityG === 'invalid' }">
          <label for="confirmpassword"
            >Confirm Password

            <input
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              v-model.trim="confirmpassword"
            />
          </label>
          <p v-if="confirmpasswordValidityG === 'invalid'">
            The password and Confirm Password should be match
          </p>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  data() {
    return {
      userName: '',
      email: '',
      gender: '',
      role: '',
      password: '',
      confirmpassword: '',
      register: false,
      router: useRouter(),
    };
  },
  mounted() {
    this.register = true;
  },
  methods: {
    ...mapActions([
      'registerA',
      'userNameValidityA',
      'passwordValidityA',
      'confirmpasswordValidityA',
      'loggedinA',
      'EmailValidityA',
    ]),
    submitForm() {
      if (this.userName === '') {
        this.userNameValidityA({ value: 'invalid' });
      } else if (this.email === '') {
        this.EmailValidityA({ value: 'invalid' });
      } else if (this.password.match('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$')) {
        this.EmailValidityA({ value: 'valid' });
        this.userNameValidityA({ value: 'valid' });
        this.passwordValidityA({ value: 'invalid' });
      } else if (this.password !== this.confirmpassword) {
        this.passwordValidityA({ value: 'valid' });
        this.confirmpasswordValidityA({ value: 'invalid' });
      } else {
        this.userNameValidityA({ value: 'Pending' });
        this.EmailValidityA({ value: 'Pending' });
        this.passwordValidityA({ value: 'Pending' });
        this.confirmpasswordValidityA({ value: 'Pending' });
        this.register = true;

        const d = Date();
        const date = d.toString();

        const account = {
          email: this.email,
          password: this.password,
          userName: this.userName,
          gender: this.gender,
          role: this.role,
          regested: date,
        };
        axios
          .post('https://hidden-slice-325816-default-rtdb.firebaseio.com/account.json', account)
          .then(() => {
            this.registerA({ value: 'true' });
            createUserWithEmailAndPassword(getAuth(), this.email, this.password);
            this.router.push('./login');
          });
      }
    },
  },
  computed: {
    ...mapGetters([
      'registerG',
      'userNameG',
      'passwordG',
      'confirmpasswordG',
      'emailG',
      'genderG',
      'roleG',
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

button {
  font: inherit;
  border: 1px solid #000000;
  background-color: #000000;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>

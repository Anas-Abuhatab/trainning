<template>
  <div class="body">
    <div>
      <h2>Articles</h2>
    <div class="card">
  <div v-for="article in articlesArrG" :key="article[0]">
          <img :src="article[1].image" alt=""/>
          <p>{{ article[1].content }}</p>
      </div>
    </div>

    </div>
    <hr style="width: 80%" size="3" color="black" />
    <h2>Contact Us</h2>
    <div class="contact">
      <div>
          <form @submit.prevent="submitContactus">
            <div class="form-control" :class="{ invalid: userNameValidityG === 'invalid' }">
              <label for="name"
                >Full Name
                <input id="name" name="name" type="text" v-model="name" placeholder="Full Name" />
              </label>
              <p v-if="userNameValidityG === 'invalid'">Please Enter a valid Name</p>
            </div>
            <div class="form-control" :class="{ invalid: EmailValidityG === 'invalid' }">
              <label for="email"
                >Email Address
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model="email"
                  placeholder="Email Address"
                />
              </label>
              <p v-if="EmailValidityG === 'invalid'">Please Enter a valid Email</p>
            </div>
            <div class="form-control" :class="{ invalid: contentValidityG === 'invalid' }">
              <label for="mobile"
                >Mobile Number
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  v-model="mobile"
                  placeholder="Mobile Number"
                />
              </label>
              <p v-if="contentValidityG === 'invalid'">Please Enter a valid Mobile Number</p>
            </div>
            <div class="form-control" :class="{ invalid: titleValidityG === 'invalid' }">
              <label for="how-video"
                >Country
                <select id="country" name="country" v-model="country" placeholder="fhjf">
                  <option value="Jordan">Jordan</option>
                  <option value="Italy">Italy</option>
                  <option value="USA">USA</option>
                  <option value="Swiss">Swiss</option>
                  <option value="Syria">Syria</option>
                  <option value="Swed">Swed</option>
                  <option value="" disabled selected>Select your Country</option>
                </select>
              </label>
              <p v-if="titleValidityG === 'invalid'">Please choose Country</p>
            </div>
            <div>
              <base-button>Submit</base-button>
            </div>
          </form>
      </div>
      <div class="contactImg">
        <!-- <img src="../../assets/pngtree-vector-location-icon-png-image_951300.jpg" alt="" /> -->
        <span>location</span>
        <br />
        <!-- <img src="../../assets/mail-icon.png" alt="" /> -->
        <span>email</span>
        <br />
        <!-- <img src="../../assets/4-2-phone-download-png.png" alt="" /> -->
        <span>+1 123 456 789</span>
        <br />
        <!-- <img src="../../assets/pngtree-vector-web-icon-png-image_320925.jpg" alt="" /> -->
        <span>http://172.20.10.4:8080/</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      mobile: '',
      country: '',
    };
  },
  computed: {
    ...mapGetters([
      'articlesArrG',
      'userNameValidityG',
      'EmailValidityG',
      'contentValidityG',
      'titleValidityG',
    ]),
  },
  methods: {
    ...mapActions([
      'articlesArrA',
      'userNameValidityA',
      'EmailValidityA',
      'contentValidityA',
      'titleValidityA',
    ]),
    getArticalData() {
      axios
        .get('https://hidden-slice-325816-default-rtdb.firebaseio.com/articles.json')
        .then((res) => res.data)
        .then((data) => {
          const toArray = Object.entries(data);
          toArray.map((e) => ({ [e[0]]: e[1] }));
          toArray.reverse();
          this.articlesArrA({ value: toArray });
        });
    },
    submitContactus() {
      if (this.name === '') {
        this.userNameValidityA({ value: 'invalid' });
      } else if (this.email === '') {
        this.EmailValidityA({ value: 'invalid' });
      } else if (this.mobile === '') {
        this.EmailValidityA({ value: 'valid' });
        this.userNameValidityA({ value: 'valid' });
        this.contentValidityA({ value: 'invalid' });
      } else if (this.country === '') {
        this.titleValidityG({ value: 'invalid' });
      } else {
        this.userNameValidityA({ value: 'Pending' });
        this.EmailValidityA({ value: 'Pending' });
        this.contentValidityA({ value: 'Pending' });
        this.titleValidityA({ value: 'Pending' });
        this.register = true;
        const contactUs = {
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          country: this.country,
        };
        axios.post(
          'https://hidden-slice-325816-default-rtdb.firebaseio.com/contactUs.json',
          contactUs,
        );
      }
    },
  },
  mounted() {
    this.getArticalData();
  },
};
</script>

<style lang="scss" scoped>
.body {
  font-family: Arial, Helvetica, sans-serif;
  justify-content: center;
  box-sizing: border-box;
}
.card{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 10% 0 10% ;
}
.card > div > img {
    width: 100%;
    height: auto;
    max-height: 300px;
}
.card > div > p {
text-align: left;
}
.card div{
  display: flex;
  width: 32.1%;
  flex-flow: column;
  align-content: flex-start;
}

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
  text-align: left;
}

h2 {
  margin: 0.5rem 0;
  text-align: center;
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

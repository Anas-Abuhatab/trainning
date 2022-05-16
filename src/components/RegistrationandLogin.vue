<template>
<div id="main">


  <div v-if="!form.regested">
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{invalid: form.userNameValidity === 'invalid'}">
        <label for="user-name">User Name</label>
        <input
          id="user-name"
          name="user-name"
          type="text"
          v-model.trim="form.userName"
        />
        <p v-if="form.userNameValidity==='invalid'">Please Enter a valid User Name</p>
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input id="email" name="email" type="text" v-model="form.email" />
      </div>
      <div class="form-control">
        <h2>Gender</h2>
        <div>
          <label for="male">Male</label>
          <input
            id="male"
            type="radio"
            value="male"
            v-model="form.gender"
          />
        </div>
        <div>
          <label for="female">Female</label>
          <input
            id="female"
            type="radio"
            value="female"
            v-model="form.gender"
          />
        </div>
      </div>
      <div class="form-control">
        <h2>Category</h2>
        <div>
          <label for="frontEnd">FrontEnd</label>
          <input
            id="frontEnd"
            name="interest"
            type="checkbox"
            value="FrontEnd"
            v-model="form.interest"
          />
        </div>
        <div>
          <label for="backEnd">BackEnd</label>
          <input
            id="backEnd"
            name="interest"
            type="checkbox"
            value="BackEnd"
            v-model="form.interest"
          />
        </div>
        <div>
          <label for="qaQc">QA $ QC</label>
          <input
            id="qaQc"
            name="interest"
            type="checkbox"
            value="Qa&Qc"
            v-model="form.interest"
          />
        </div>
        <div>
          <label for="design">Design</label>
          <input
            id="design"
            name="interest"
            type="checkbox"
            value="Design"
            v-model="form.interest"
          />
        </div>
      </div>
      <div class="form-control" :class="{invalid: form.passwordValidity === 'invalid'}">
        <label for="how-video">Password</label>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            v-model.trim="form.password"
          />
          <p v-if="form.passwordValidity==='invalid'">Please Enter a valid password</p>
        </div>
      </div>
      <div class="form-control" :class="{invalid: form.confirmpasswordValidity === 'invalid'}">
        <label for="confirmpassword">Confirm Password</label>
        <input
          id="confirmpassword"
          name="confirmpassword"
          type="password"
          v-model.trim="form.confirmpassword"
        />
        <p v-if="form.confirmpasswordValidity==='invalid'">The password and Confirm Password should be match</p>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  </div>
  <div v-else-if="form.regested && !form.loggedin">
    <form @submit.prevent="submitFormLogin">
      <h1>Login Please</h1>
      <div class="form-control">
        <label for="user-name">User Name</label>
        <input
          id="user-name"
          name="user-name"
          type="text"
          value=""
          ref="loggedinUserName"
        />
      </div>
      <div class="form-control">
        <label for="how-video">Password</label>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            value=""
            ref="loggedinPassWord"
          />
        </div>
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  </div>
  <div v-if="form.loggedin && form.regested">
<form>
      <h1>Congratulations</h1>
    <h2>You Have logged in successfully</h2>
    <h3>Your Profile</h3>
      <div class="form-control">
        <label for="user-name">User Name : {{form.userName}}</label>
        
      </div>
      <div class="form-control">
        <label for="how-video">Email : {{form.email}}</label>
        
      </div>
      <div class="form-control">
        <label for="how-video">Gender : {{ form.gender}}</label>
        
      </div>
      <div class="form-control">
        <label for="how-video">Categories :</label>
          <li v-for="i in form.interest" :key="i">
            {{i}}
          </li>
        
      </div>

    </form>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    form:{
      userName: "",
      email: "",
      gender: "",
      interest: [],
      password: "",
      confirmpassword: "",
      regested: false,
      loggedin: false,
      userNameValidity: "Pending",
      passwordValidity: "Pending",
      confirmpasswordValidity:"Pending"
    }
    };
  },
  methods: {
    submitForm() {
      this.validityInbut();
    },
    submitFormLogin() {
      if (
        this.form.userName == this.$refs.loggedinUserName.value &&
        this.form.password == this.$refs.loggedinPassWord.value
      ) {
        this.form.loggedin = true;
      } else {
        alert("Please Enter a Valid UserName and Password");
      }
    },
    validityInbut() {
      if (this.form.userName === "") {
        this.form.userNameValidity = "invalid";
      } else if (this.form.password === "") {
        this.form.userNameValidity = "valid";
        this.form.passwordValidity = "invalid";
      } else if (this.form.password != this.form.confirmpassword) {
        this.form.passwordValidity = "valid";
        this.form.confirmpasswordValidity = "invalid";
      } else {
        this.form.userNameValidity = "valid";
        this.form.passwordValidity = "valid";
        this.form.confirmpasswordValidity="valid";
        this.form.regested = true;
      }
    },
  },
};
</script>

<style scoped>
#main{
  font-family: "Merienda", Helvetica, Arial;
  font-size: 1rem;
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

input[type="checkbox"],
input[type="radio"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type="checkbox"] + label,
input[type="radio"] + label {
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

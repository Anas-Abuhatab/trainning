import { createStore } from 'vuex';

export default createStore({
  state: {
    regested: '',
    userName: '',
    password: '',
    confirmpassword: '',
    email: '',
    gender: '',
    role: '',
    loggedin: '',
    userNameValidity: 'Pending',
    passwordValidity: 'Pending',
    confirmpasswordValidity: 'Pending',
    EmailValidity: 'Pending',
    titleValidity: 'Pending',
    descriptionValidity: 'Pending',
    contentValidity: 'Pending',
    title: '',
    articlesArr: [],
    onComment: false,
  },
  getters: {
    registerG(state) {
      return state.regested;
    },
    userNameG(state) {
      return state.userName;
    },
    passwordG(state) {
      return state.password;
    },
    confirmpasswordG(state) {
      return state.confirmpassword;
    },
    emailG(state) {
      return state.email;
    },
    genderG(state) {
      return state.gender;
    },
    roleG(state) {
      return state.role;
    },
    loggedinG(state) {
      return state.loggedin;
    },
    userNameValidityG(state) {
      return state.userNameValidity;
    },
    passwordValidityG(state) {
      return state.passwordValidity;
    },
    confirmpasswordValidityG(state) {
      return state.confirmpasswordValidity;
    },
    EmailValidityG(state) {
      return state.EmailValidity;
    },
    titleValidityG(state) {
      return state.titleValidity;
    },
    descriptionValidityG(state) {
      return state.descriptionValidity;
    },
    contentValidityG(state) {
      return state.contentValidity;
    },
    titleG(state) {
      return state.title;
    },
    articlesArrG(state) {
      return state.articlesArr;
    },
    onCommentG(state) {
      return state.onComment;
    },
  },
  mutations: {
    registerM(state, payload) {
      state.regested = payload.value;
    },
    userNameM(state, payload) {
      state.userName = payload.value;
    },
    passwordM(state, payload) {
      state.password = payload.value;
    },
    confirmpasswordM(state, payload) {
      state.confirmpassword = payload.value;
    },
    emailM(state, payload) {
      state.email = payload.value;
    },
    genderM(state, payload) {
      state.gender = payload.value;
    },
    roleM(state, payload) {
      state.role = payload.value;
    },
    loggedinM(state, payload) {
      state.loggedin = payload.value;
    },
    userNameValidityM(state, payload) {
      state.userNameValidity = payload.value;
    },
    passwordValidityM(state, payload) {
      state.passwordValidity = payload.value;
    },
    confirmpasswordValidityM(state, payload) {
      state.confirmpasswordValidity = payload.value;
    },
    EmailValidityM(state, payload) {
      state.EmailValidity = payload.value;
    },
    titleValidityM(state, payload) {
      state.titleValidity = payload.value;
    },
    descriptionValidityM(state, payload) {
      state.descriptionValidity = payload.value;
    },
    contentValidityM(state, payload) {
      state.contentValidity = payload.value;
    },
    titleM(state, payload) {
      state.title = payload.value;
    },
    articlesArrM(state, payload) {
      state.articlesArr = payload.value;
    },
    onCommentM(state, payload) {
      state.onComment = payload.value;
    },
  },
  actions: {
    registerA(context, payload) {
      context.commit('registerM', payload);
    },
    userNameA(context, payload) {
      context.commit('userNameM', payload);
    },
    passwordA(context, payload) {
      context.commit('passwordM', payload);
    },
    confirmpasswordA(context, payload) {
      context.commit('confirmpasswordM', payload);
    },
    emailA(context, payload) {
      context.commit('emailM', payload);
    },
    genderA(context, payload) {
      context.commit('genderM', payload);
    },
    roleA(context, payload) {
      context.commit('roleM', payload);
    },
    loggedinA(context, payload) {
      context.commit('registerM', payload);
    },
    userNameValidityA(context, payload) {
      context.commit('userNameValidityM', payload);
    },
    passwordValidityA(context, payload) {
      context.commit('passwordValidityM', payload);
    },
    confirmpasswordValidityA(context, payload) {
      context.commit('confirmpasswordValidityM', payload);
    },
    EmailValidityA(context, payload) {
      context.commit('EmailValidityM', payload);
    },
    titleValidityA(context, payload) {
      context.commit('titleValidityM', payload);
    },
    descriptionValidityA(context, payload) {
      context.commit('descriptionValidityM', payload);
    },
    contentValidityA(context, payload) {
      context.commit('contentValidityM', payload);
    },
    titleA(context, payload) {
      context.commit('titleM', payload);
    },
    articlesArrA(context, payload) {
      context.commit('articlesArrM', payload);
    },
    onCommentA(context, payload) {
      context.commit('onCommentM', payload);
    },
  },
  modules: {},
});

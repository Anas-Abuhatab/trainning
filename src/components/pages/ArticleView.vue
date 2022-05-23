<template>
  <base-card>
    <h1>Article List</h1>
    <base-button @click="addHandler">Add New Article</base-button>
    <form @submit.prevent="submitArticleForm" v-if="add">
      <div class="form-control" :class="{ invalid: titleValidityG === 'invalid' }">
        <label for="title"
          >Title
          <input id="title" name="title" type="text" v-model="title" />
        </label>
        <p v-if="titleValidityG === 'invalid'">Please Enter a valid title</p>
      </div>
      <div class="form-control" :class="{ invalid: passwordValidityG === 'invalid' }">
        <label for="description"
          >Description
          <textarea id="description" name="description" maxlength="255" v-model="description" />
        </label>
        <p v-if="descriptionValidityG === 'invalid'">Please Enter a valid Description</p>
      </div>
      <div class="form-control" :class="{ invalid: contentValidityG === 'invalid' }">
        <label for="content"
          >Content
          <textarea id="content" name="content" maxlength="255" v-model="content" />
        </label>
        <p v-if="contentValidityG === 'invalid'">Please Enter a valid content</p>
      </div>
      <div class="form-control">
        <label for="img"
          >Image
          <input type="file" id="img" name="img" @change="onFileSelected" accept="image/*" />
        </label>
        <p v-if="imgErr">Please Enter a valid image</p>
        <img :src="imageUrl" height="150" alt="" />
      </div>
      <div>
        <base-button>Submit</base-button>
      </div>
    </form>
  </base-card>
  <base-card v-for="article in articlesArrG" :key="article[0]">
    <div>
      <h3>Title: {{ article[1].title }}</h3>
      <h3>Description: {{ article[1].description }}</h3>
      <h3>Content: {{ article[1].content }}</h3>
      <img :src="article[1].image" height="150" alt="" />
      <h3>Comments: {{ article[1].comment }}</h3>
      <update-form
        v-if="edit"
        @close="editHandler"
        :idP="article[0]"
        :titlep="article[1].title"
        :descriptionp="article[1].description"
        :contentp="article[1].content"
        :imagep="article[1].image"
        :commentp="article[1].comment"
        :oncoment="onCommentG"
      >
      </update-form>
      <base-button @click="editHandler">Edit</base-button>
      <base-button @click="commentHandler">Write Comments</base-button>
    </div>
  </base-card>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import UpdateForm from '../forms/UpdateForm.vue';
// import * as firebase from 'firebase/app';

export default {
  data() {
    return {
      add: false,
      edit: false,
      title: '',
      description: '',
      content: '',
      submitedTitle: '',
      imageUrl: '',
      image: null,
      imgErr: false,
    };
  },
  components: {
    UpdateForm,
  },
  methods: {
    ...mapActions([
      'titleValidityA',
      'descriptionValidityA',
      'contentValidityA',
      'titleA',
      'articlesArrA',
      'onCommentA',
    ]),
    onFileSelected(event) {
      const files = event.target.files[0];
      const fileName = files.name;
      if (fileName.lastIndexOf('.') <= 0) {
        alert('Please add a valid file');
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files);
      this.image = files;
    },
    addHandler() {
      this.add = !this.add;
    },
    editHandler() {
      this.onCommentA({ value: false });
      this.edit = !this.edit;
    },
    commentHandler() {
      this.onCommentA({ value: true });
      this.edit = !this.edit;
    },
    submitArticleForm() {
      if (this.title === '') {
        this.titleValidityA({ value: 'invalid' });
      } else if (this.description === '') {
        this.titleValidityA({ value: 'valid' });
        this.descriptionValidityA({ value: 'invalid' });
      } else if (this.content === '') {
        this.descriptionValidityA({ value: 'valid' });
        this.contentValidityA({ value: 'invalid' });
      } else if (!this.image) {
        this.contentValidityA({ value: 'valid' });
        this.imgErr = true;
      } else {
        this.imgErr = false;
        this.titleValidityA({ value: 'Pending' });
        this.descriptionValidityA({ value: 'Pending' });
        this.contentValidityA({ value: 'Pending' });
        const article = {
          title: this.title,
          description: this.description,
          content: this.content,
          image: this.imageUrl,
          comment: 'No comments',
        };
        axios
          .post('https://hidden-slice-325816-default-rtdb.firebaseio.com/articles.json', article)
          .then((res) => {
            this.titleA({ value: this.title });
            this.submitedTitle = this.titleG;
          });
      }
    },
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
  },
  computed: {
    ...mapGetters([
      'titleValidityG',
      'descriptionValidityG',
      'contentValidityG',
      'titleG',
      'articlesArrG',
      'onCommentG',
    ]),
  },
  watch: {
    submitedTitle() {
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
  },
  mounted() {
    this.getArticalData();
  },
};
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

input,
input[type='radio'] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

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

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h2 name="header">Edit</h2>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submitArticleForm" v-if="oncoment">
            <div class="form-control" :class="{ invalid: titleValidityG === 'invalid' }">
              <label for="title"
                >Title
                <input id="title" name="title" type="text" v-model="title" disabled />
              </label>
              <p v-if="titleValidityG === 'invalid'">Please Enter a valid title</p>
            </div>
            <div class="form-control" :class="{ invalid: passwordValidityG === 'invalid' }">
              <label for="description"
                >Description
                <textarea
                  id="description"
                  name="description"
                  maxlength="255"
                  v-model="description"
                  disabled
                />
              </label>
              <p v-if="descriptionValidityG === 'invalid'">Please Enter a valid Description</p>
            </div>
            <div class="form-control" :class="{ invalid: contentValidityG === 'invalid' }">
              <label for="content"
                >Content
                <textarea id="content" name="content" maxlength="255" v-model="content" disabled />
              </label>
              <p v-if="contentValidityG === 'invalid'">Please Enter a valid content</p>
            </div>
            <div class="form-control">
              <label for="img"
                >Image
                <input
                  type="file"
                  id="img"
                  name="img"
                  @change="onFileSelected"
                  accept="image/*"
                  disabled
                />
              </label>
              <p v-if="imgErr">Please Enter a valid image</p>
              <img :src="imageUrl" height="150" alt="" />
            </div>
            <div class="form-control">
              <label for="comment"
                >Comment
                <input type="text" id="comment" name="comment" v-model="comment" />
              </label>
            </div>
            <div>
              <base-button>Submit</base-button>
            </div>
          </form>
          <form @submit.prevent="submitArticleForm" v-else>
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
                <textarea
                  id="description"
                  name="description"
                  maxlength="255"
                  v-model="description"
                />
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
        </div>

        <div class="modal-footer">
          <button class="modal-default-button" @click="$emit('close')">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      title: this.titlep,
      description: this.descriptionp,
      content: this.contentp,
      submitedTitle: '',
      imageUrl: this.imagep,
      image: null,
      imgErr: false,
      isEdited: false,
      comment: '',
    };
  },
  emits: ['close'],
  props: ['idP', 'titlep', 'descriptionp', 'contentp', 'imagep', 'commentp', 'oncoment'],
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
    submitArticleForm() {
      if (this.title === '') {
        this.titleValidityA({ value: 'invalid' });
      } else if (this.description === '') {
        this.titleValidityA({ value: 'valid' });
        this.descriptionValidityA({ value: 'invalid' });
      } else if (this.content === '') {
        this.descriptionValidityA({ value: 'valid' });
        this.contentValidityA({ value: 'invalid' });
      } else {
        this.imgErr = false;
        this.titleValidityA({ value: 'Pending' });
        this.descriptionValidityA({ value: 'Pending' });
        this.contentValidityA({ value: 'Pending' });
        let article;
        if (this.oncoment) {
          article = {
            title: this.title,
            description: this.description,
            content: this.content,
            image: this.imagep,
            comment: this.comment,
          };
        } else {
          article = {
            title: this.title,
            description: this.description,
            content: this.content,
            image: this.imagep,
            comment: this.commentp,
          };
        }
        axios
          .put(
            `https://hidden-slice-325816-default-rtdb.firebaseio.com/articles/${this.idP}.json`,
            article,
          )
          .then((res) => {
            this.$emit('close');
            this.isEdited = !this.isEdited;
            this.onCommentA({ value: false });
          });
      }
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
  },
  watch: {
    isEdited() {
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
});
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 60%;
  height: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
form {
  height: 100%;
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

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(14.14);
  transform: scale(14.14);
}
</style>

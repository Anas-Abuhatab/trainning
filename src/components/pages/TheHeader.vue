<template>
  <div class="container">
  <img src="../../assets/art2.jpg" alt="Snow">
  <div class="text">COMPANY SLAGON HERE</div>
  <div class="button"><router-link to="/">LTS's TALK</router-link></div>
</div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  text-align: center;
  color: white;
}

img{
  width: 100%;
  height: auto;
}
/* Bottom right text */
.text {
  position: absolute;
  top: 45%;
  left: 45%;
  color: white;
  font-weight: bold;
}

/* Centered text */
.button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
>

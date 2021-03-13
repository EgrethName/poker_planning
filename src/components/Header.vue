<template>
  <div class="container header-intro">
    <div class="row">
    <div class="col-lg-3 col-sm-4">
      <p class="text-general">PokerPlanning</p>
    </div>
    <div class="col-lg-5 col-sm-2">
    </div>
    <div class="col-lg-4 col-sm-6">
      <b-button class="btn-intro" v-b-modal.modal-login>Log In</b-button>
      <b-button class="btn-intro">Sign Up</b-button>
    </div>
    <LoginModal msg='Log In' />
  </div>
  </div>
</template>

<script>

import LoginModal from '@/components/LoginModal.vue';


export default {
  components: {
    LoginModal
  },

}
</script>

<style
    lang='scss'
    scoped
>

.text-general {
    font-size: 24px;
    margin: 10px;
}

.header-intro {
    background-color: rgb(138, 170, 240);
}

.btn-intro {
    margin: 10px 10px;
}
</style>
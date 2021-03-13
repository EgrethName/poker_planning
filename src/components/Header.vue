<template>
  <div class="container header-intro">
    <div class="row">
    <div class="col-lg-2 col-sm-2">
      <span class="text-general">PokerPlanning</span>
    </div>
    <div class="col-lg-6 col-sm-4">
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
}

.header-intro {
    background-color: rgb(138, 170, 240);
}

.btn-intro {
    margin: 10px 10px;
}
</style>
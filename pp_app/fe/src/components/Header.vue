<template>
  <div class="container header-intro">
    <div class="row">
    <div class="col-lg-4 col-sm-4">
      <p class="text-general">Poker Planning</p>
    </div>
    <div class="col-lg-4 col-sm-2">
    </div>
    <div class="col-lg-4 col-sm-6">
      <div id="disabled-wrapper" class="btn-wrapper" tabindex="0">
        <b-button 
          class="btn-intro"
          v-b-modal.modal-login
          disabled
        >
          Log In
        </b-button>
      </div>
      <div id="disabled-wrapper-2" class="btn-wrapper" >
        <b-button 
          class="btn-intro"
          disabled
        >
          Sign Up
        </b-button>
      </div>
      <div class="btn-wrapper" >
        <b-button 
          class="btn-intro"
          @click="logout"
        >
          Log out
        </b-button>
      </div>
      <b-tooltip target="disabled-wrapper">{{ tooltipText }}</b-tooltip>
      <b-tooltip target="disabled-wrapper-2">{{ tooltipText }}</b-tooltip>
    </div>
    <LoginModal msg='Log In' />
  </div>
  </div>
</template>

<script>
import { baseUrl } from '@/modules/xhr';

import LoginModal from '@/components/LoginModal.vue';


export default {
  components: {
    LoginModal
  },
  props: {
    tooltipText: String
  },
  methods: {
    logout() {
      localStorage.removeItem('name');
      window.location.assign(`${baseUrl}`);
    }
  }
}
</script>

<style
    lang='scss'
    scoped
>

.text-general {
  font-size: 30px;
  font-weight: 600;
  margin: 0.3em;
}

.header-intro {
  background-color: #E8EEF9;
  margin-top: 20px;
  margin-bottom: 20px;
}

.btn-intro {
  margin: 10px 10px 0 10px;

}

.btn-wrapper {
  display: inline-block;
}

</style>
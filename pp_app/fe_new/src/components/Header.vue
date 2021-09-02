<template>
  <div class="header-intro">
    <nav-bar/>
    <div>
      <p class="text-general">Poker Planning</p>
    </div>
    <div
      class="btns-login"
    >
      <a-tooltip
        :title="tooltipText"
      >
        <a-button
          class="btn"
          disabled
        >
          Log In
        </a-button>
      </a-tooltip>
      <a-tooltip
        :title="tooltipText"
      >
        <a-button
          class="btn"
          disabled
        >
          Sign Up
        </a-button>
      </a-tooltip>
      <a-button
        class="btn"
        @click="logout"
      >
        Log out
      </a-button>
    </div>
    <!--      <LoginModal msg='Log In' />-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  name: 'Header',

  data() {
    return {
      tooltipText: 'Coming Soon',
    };
  },

  components: {
    NavBar,
  },

  methods: {
    logout() {
      localStorage.removeItem('name');
      this.$router.push('/');
    },
  },
});

</script>

<style
  lang='scss'
  scoped
>

.container {
  display: flex;
  flex-direction: row;
}

.text-general {
  font-size: 30px;
  font-weight: 600;
  margin: 0;
}

.header-intro {
  display: flex;
  background-color: #E8EEF9;
}

.btns-login {
  margin-left: auto;
}

.btn {
  margin: 10px 10px 0 10px;
}

//
//.btn-wrapper {
//  display: inline-block;
//}

</style>

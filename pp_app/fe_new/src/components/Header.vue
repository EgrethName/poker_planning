<template>
  <div class="container header-intro">
    <div class="row">
      <nav-bar />
      <div class="col-lg-4 col-sm-4">
        <p class="text-general">Poker Planning</p>
      </div>
      <div class="col-lg-4 col-sm-2">
      </div>
      <div class="col-lg-4 col-sm-6">
        <a-tooltip
          :title="tooltipText"
        >
          <a-button
            class="btn-intro"
            disabled
          >
            Log In
          </a-button>
        </a-tooltip>
        <a-tooltip
          :title="tooltipText"
        >
          <a-button
            class="btn-intro"
            disabled
          >
            Sign Up
          </a-button>
        </a-tooltip>
        <div class="btn-wrapper" >
          <a-button
            class="btn-intro"
            @click="logout"
          >
            Log out
          </a-button>
        </div>
      </div>
      <!--      <LoginModal msg='Log In' />-->
    </div>
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

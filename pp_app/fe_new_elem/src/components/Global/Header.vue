<template>
  <div class="header-intro">
    <div @click="$router.push('/')">
      <p class="text-general">Poker Planning</p>
    </div>
    <div
      class="btns-login"
    >
      <el-tooltip
        :content="tooltipText"
        placement="bottom"
      >
        <el-button
          class="btn"
          disabled
        >
          Log In
        </el-button>
      </el-tooltip>
      <el-tooltip
        content="tooltipText"
        placement="bottom"
      >
        <div style="display: inline-block">
          <el-button
            class="btn"
            disabled
          >
            Sign Up
          </el-button>
        </div>
      </el-tooltip>
      <el-button
        class="btn"
        @click="logout"
      >
        Log out
      </el-button>
      <el-tooltip
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <el-button>bottom</el-button>
      </el-tooltip>
    </div>
    <!--      <LoginModal msg='Log In' />-->
  </div>
  <nav-bar/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/Global/NavBar.vue';

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
  font-weight: 400;
  margin: 0.3em;
}

.header-intro {
  display: flex;
  //color: white;
  flex-wrap: wrap;
  background-color: #E8EEF9;
}

.btns-login {
  margin-left: auto;
}

//
//.btn-wrapper {
//  display: inline-block;
//}

</style>

<template>
  <div
    class="navbar"
  >
    <div class="navbar__btns">
<!--      <a-button class="btn" @click="$router.push(`/game/${currentGameId}`)">-->
<!--        {{ currentGameName }}-->
<!--      </a-button>-->
      <a-tabs v-model="activeKey" type="editable-card" @tabClick="tabClick">
        <a-tab-pane
          v-for="pane in panes"
          :to="pane.link"
          :key="pane.key"
          :tab="pane.title"
          closable
          >
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'NavBar',
  data() {
    return {
      newTabIndex: 0,
      activeKey: '1',
    };
  },
  computed: {
    ...mapState({
      currentGameId: (state): string => (state as State).sessionId,
      currentGameName: (state): string => (state as State).roomName,
    }),

    panes(): Array<unknown> {
      console.log(this.currentGameId);
      return [
        { title: `${this.currentGameName}`, link: `/game/${this.currentGameId}`, key: '1' },
        // { title: 'Tab 2', link: 'Content of Tab 2', key: '2' },
        // { title: 'Tab 3', link: 'Content of Tab 3', key: '3' },
      ];
      // return [{ title: 'Tab 1', link: `/game/${this.currentGameId}`, key: '1' }];
    },
    // activeKey() {
    //   return this.panes[0]?.key;
    // },
  },
  methods: {
    tabClick(key: unknown) {
      console.log(key);
      this.$router.push(`/game/${this.currentGameId}`);
    },
  },
});
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: 10px;
}

::v-deep .ant-tabs-bar {
  margin-bottom: 0;
}

</style>

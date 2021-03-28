<template>
  <div>
    <button
      class="completed-vote-badge"
      @click="onClick"
    >    
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    stats: Object,
  },
  computed: {
    title() {
      return this.stats.title;
    },
    id() {
      return this.stats.id;
    }
  },
  methods: {
    onClick() {
      this.$emit('clicked', this.id);
    }
  }
}
</script>

<style 
  scoped
  lang="scss"
>

.completed-vote-badge {
  -webkit-appearance: button;
  background-color: #E8EEF9;
  border: 2px solid #000;
  border-radius: 5px;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  cursor: pointer;
  float: left;
  font-weight: 700;
  letter-spacing: .05em;
  margin: 3px;
  outline: none;
  overflow: visible;
  padding: 0.5em;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  transition: all .3s ease-in-out;
  user-select: none;
  width: 100%;

  &:hover {
    background-color: #BDD0F7;
  }
}

</style>
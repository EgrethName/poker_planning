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
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'CompletedVoteBadge',
  props: {
    stats: Object,
  },
  setup(props, context) {
    const { title, id } = toRefs(props);

    const onClick = () => {
      context.emit('clicked', id);
    };

    return {
      title,
      id,
      onClick,
    };
  },
});
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

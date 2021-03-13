<template>
  <div>
    <button>{{ value }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelected: false
    }
  },
  props: {
    value: String
  }
}
</script>

<style>

</style>
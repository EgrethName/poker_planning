<template>
  <div class="share-input">
    <div id="invitation">
      <h5>Invite more people!</h5>
    </div>
    <b-input-group>
      <b-form-input
        id="input-link"
        v-model="link"
        onClick="this.select();"
        readonly
      >
      </b-form-input>

      <template #append>
        <b-input-group-text
          class="copy-button"
          @click.stop.prevent="copyToClipboard"
        >
          <b-icon icon="clipboard" />
        </b-input-group-text>
      </template>
    </b-input-group>
  </div>
</template>

<script>
export default {
  props: {
    link: String
  },
  methods: {
    copyToClipboard() {
      console.log('copy')
      let testingCodeToCopy = document.querySelector('#input-link');
      testingCodeToCopy.setAttribute('type', 'text');
      testingCodeToCopy.select();
      document.execCommand('copy');

      /* unselect the range */
      // testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  }
}
</script>

<style
  scoped
  lang="scss"
>

.share-input {
  margin: 30px 0;
}

.copy-button {
  &:hover {
    color: #000;
    cursor: pointer;

    svg {
      font-size: 150%;
    }
  }

  &:active {
    background-color: #fff;
  }
}

</style>
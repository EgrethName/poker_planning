<template>
  <div class="poker-intro">
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames" :key="name">{{ name }}</li>
      </ul>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <p v-if="errors.length">
        <b>Пожалуйста исправьте указанные ошибки:</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Game name"
          label-for="game-input"
          invalid-feedback="Game name is required"
          :state="gameState"
        >
          <b-form-input
            id="game-input"
            v-model="gameName"
            :state="gameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: '',
      gameName: '',
      show: true,
      nameState: null,
      gameState: null,
      submittedNames: [],
      gameNames: [],
      errors: []
    }
  },
  props: {
    msg: String
  },
  methods: {
    toggle() {
        console.log('Toggle button clicked')
        this.show = !this.show
    },
    dismissed() {
      console.log('Alert dismissed')
    },
    checkFormValidity() {
        this.nameState = true;
        this.gameState = true;
        if (!this.name) {
          this.nameState = false
        }
        if (!this.gameName) {
          this.gameState = false
        }
        return this.nameState && this.gameState
    },
    resetModal() {
      this.name = '';
      this.nameState = null;
      this.gameName = '';
      this.gameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      this.gameNames.push(this.gameName)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>

<style
  lang='scss'
  scoped
>
.poker-intro {
    top: 30%;
    margin: auto;
    padding: 2em;
    
}
</style>
<template>
  <div class="poker-intro">
    <b-button v-b-modal.modal-prevent-closing>Create a game</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create a new game"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      ok-title="Create!"
      cancel-variant="dark"
      centered
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
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
      <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      >
        <p>Error occured when creating a game</p>
      </b-alert>
    </b-modal>
  </div>
</template>


<script>
import { baseUrl, xhr } from '@/modules/xhr';

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
      errors: [],
      dismissSecs: 2,
      dismissCountDown: 0,
      sessionId: '',
      submitGameSuccess: false,
      submitNameSuccess: false,
    }
  },
  props: {
    msg: String
  },

  watch: {
    submitGameSuccess(status) {
      if (status) {
        console.log('success');
        this.$bvModal.hide('modal-prevent-closing');
        window.location.assign(`${baseUrl}/${this.sessionId}`);
      }
      else {
        this.resetModal();
      }
    }
  },
  
  methods: {
    checkFormValidity() {
      return this.gameName;
    },
    resetModal() {
      this.name = '';
      this.nameState = null;
      this.gameName = '';
      this.gameState = null;
      this.submitGameSuccess = false;
      this.submitNameSuccess = false;
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
      this.gameNames.push(this.gameName);
      this.sendCreateGame();
    },
    async sendCreateGame() {
      await xhr.post(`/new_game`, {
          game_name: this.gameName,
        })
        .then(response => {
          console.log(response.data);
          this.submitGameSuccess = true;
          this.sessionId = response.data.id;
        })
        .catch(() => {
          this.showAlert();
          this.submitGameSuccess = false;
        })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
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
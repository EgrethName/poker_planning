<template>
  <div>
    <b-modal
      id="modal-input-name"
      ref="modalName"
      title="Type your name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      ok-title="Send"
    >
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
import { mapState } from 'vuex';

export default {
  data() {
    return {
      name: '',
      nameState: null,
      submitNameSuccess: false
    }
  },
  props: [
    'value'
  ],
  computed: {
    ...mapState({
        playerName: (state) => state.playerName,
      }),
  },
  methods: {
    checkFormValidity() {
        return this.name
    },
    resetModal() {
      this.name = '';
      this.nameState = null;
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
      this.$emit('clicked', this.name);
    },
    show() {
        this.$refs.modalName.show();
    }
  },
  watch: {
    value(status) {
      if (status) {
        this.$bvModal.hide('modal-input-name');
      }
      else {
        this.resetModal();
      }
    }
  }
}
</script>

<style>

</style>
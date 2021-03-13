<template>
  <div>
    <b-modal
      id="modal-login"
      ref="modal"
      :title=msg
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      ok-title="Submit"
      cancel-variant="dark"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Login"
          label-for="login-input"
          invalid-feedback="Login is required"
          :state="loginState"
        >
          <b-form-input
            id="login-input"
            v-model="login"
            :state="loginState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
          :state="passwordState"
        >
          <b-form-input
            id="password-input"
            v-model="password"
            :state="passwordState"
            type="password"
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
      login: '',
      password: '',
      show: true,
      loginState: null,
      passwordState: null,
    }
  },
  props: {
    msg: String
  },
  methods: {
  checkFormValidity() {
    this.loginState = true;
    this.passwordState = true;
    if (!this.login) {
      this.passwordState = false
    }
    if (!this.password) {
      this.loginState = false
    }
    return this.loginState && this.passwordState
  },
  resetModal() {
    this.login = '';
    this.loginState = null;
    this.password = '';
    this.passwordState = null;
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
    // Hide the modal manually
    this.$nextTick(() => {
      this.$bvModal.hide('modal-login')
    })
  }
  }
  
}
</script>

<style>

</style>
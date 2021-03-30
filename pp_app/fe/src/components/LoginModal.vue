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
      centered
      no-close-on-esc
      no-close-on-backdrop
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
      this.loginState = false
    }
    if (!this.password) {
      this.passwordState = false
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
.box {
    width: 500px;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    background: #191919;
    ;
    text-align: center;
    transition: 0.25s;
    margin-top: 100px
}

.box input[type="text"],
.box input[type="password"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    width: 250px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s
}

.box h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 500
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
    width: 300px;
    border-color: #2ecc71
}

.box input[type="submit"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #2ecc71;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer
}

.box input[type="submit"]:hover {
    background: #2ecc71
}

</style>
<template>
  <div class="poker-intro">
    <a-button @click="showModal">Create a game</a-button>

    <a-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create a new game"
      v-model:visible="visible"
      @show="resetForm"
      @hidden="resetForm"
      @ok="onSubmit"
      @cancel="resetForm"
      ok-title="Create!"
      cancel-variant="dark"
      centered
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        @submit.stop.prevent="onSubmit"
      >
        <a-form-item
          ref="name"
          label="Game name"
          name="name"
        >
          <a-input v-model:value="formState.name"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  UnwrapRef,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';

interface FormState {
  name: string;
}

export default defineComponent({
  name: 'CreateGame',
  setup() {
    const formRef = ref();
    const visible = ref(false);
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
    });
    const store = useStore();
    const router = useRouter();

    const openNotification = () => {
      notification.error({
        message: 'Failed to create a new game',
        description:
          'Something went wrong with the server answer.',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    };

    const rules = {
      name: [
        {
          required: true, message: 'Please input Game name', trigger: 'blur',
        },
        {
          min: 3, max: 20, message: 'Length should be 3 to 5', trigger: 'blur',
        },
      ],
    };
    const showModal = () => {
      visible.value = true;
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };

    const onSubmit = (e: MouseEvent) => {
      console.log(e);
      formRef.value
        .validate()
        .then(() => store.dispatch('sendCreateGame', formState.name))
        .then((id: string) => {
          visible.value = false;
          resetForm();
          router.push(`/game/${id}`);
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error);
          openNotification();
        });
    };

    store.dispatch('activate');

    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      formState,
      rules,
      onSubmit,
      resetForm,
      visible,
      showModal,
      openNotification,
    };
  },
});

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

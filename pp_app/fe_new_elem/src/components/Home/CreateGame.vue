<template>
  <div class="poker-intro">
    <el-button @click="showModal">Create a game</el-button>

    <el-dialog
      ref="modal"
      title="Create a new game"
      v-model="visible"
      @close="resetForm"
      center
    >
      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        @submit.stop.prevent="onSubmit"
      >
        <el-form-item
          ref="name"
          label="Game name"
          name="name"
        >
          <el-input v-model="formState.name"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
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
import { ElNotification } from 'element-plus';

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
      ElNotification({
        title: 'Error',
        message: 'Failed to create a new game',
        // description:
        //   'Something went wrong with the server answer.',
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
      visible.value = false;
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
        .catch(() => {
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

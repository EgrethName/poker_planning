<template>
  <div
    class="input-name"
  >
<!--    <a-modal-->
<!--      id="modal-prevent-closing"-->
<!--      ref="modalInputName"-->
<!--      title="Enter your name"-->
<!--      v-model:visible="visible"-->
<!--      @show="resetForm"-->
<!--      @hidden="resetForm"-->
<!--      @ok="onSubmit"-->
<!--      @cancel="resetForm"-->
<!--      ok-title="Create!"-->
<!--      cancel-variant="dark"-->
<!--      centered-->
<!--    >-->
      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        @submit.stop.prevent="onSubmit"
      >
        <el-form-item
          ref="name"
          label="Your name"
          name="name"
        >
          <el-input v-model="formState.name"/>
        </el-form-item>
      </el-form>
<!--      <template #footer>-->
<!--        <a-button key="back" @click="handleCancel">Return</a-button>-->
<!--        <a-button-->
<!--          key="submit"-->
<!--          type="primary"-->
<!--          :loading="loading"-->
<!--          @click="handleOk">Submit</a-button>-->
<!--      </template>-->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRaw,
  toRefs,
  watch,
  UnwrapRef,
} from 'vue';

interface FormState {
  name: string;
}

export default defineComponent({
  name: 'InputNameModal',
  props: {
    modelName: {
      type: Object,
    },
  },
  setup(props, context) {
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
    });
    const { modelName } = toRefs(props);
    const valid = ref(false);
    //
    // const openNotification = () => {
    //   notification.error({
    //     message: 'Notification Title',
    //     description:
    //       'This is the content of the notification.
    //       This is the content of the notification.',
    //     onClick: () => {
    //       console.log('Notification Clicked!');
    //     },
    //   });
    // };

    const rules = {
      name: [
        {
          required: true, message: 'Please input Game name', trigger: 'blur',
        },
        {
          min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur',
        },
      ],
    };
    // const form: WritableComputedRef<boolean> = computed({
    //   get(): boolean {
    //     return modalVisible.value;
    //   },
    //   set(newValue: boolean): void {
    //     console.log('set visible', newValue);
    //     context.emit('update:modalVisible', newValue);
    //   },
    // });
    const resetForm = () => {
      formRef.value.resetFields();
    };
    watch(() => formState.name, (newValue) => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', formState, toRaw(formState));
          valid.value = true;
        })
        .catch(() => { valid.value = false; })
        .finally(() => {
          console.log(valid.value);
          console.log(modelName);
          context.emit('update:modelName', {
            name: newValue,
            valid: valid.value,
          });
        });
    });
    const onSubmit = (e: MouseEvent) => {
      console.log(e);
      formRef.value
        .validate()
        // .then(() => store.dispatch('enterGame', formState.name))
        .then(() => {
          console.log('values', formState, toRaw(formState));
          context.emit('clicked', formState.name);
          resetForm();
        })
        .catch(() => {
          console.log('error');
          // openNotification();
        });
    };

    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      formState,
      rules,
      onSubmit,
      resetForm,
    };
  },
});

</script>

<style
  lang='scss'
  scoped
>
.input-name {
  top: 30%;
  margin: auto;
  padding: 2em;

}
</style>

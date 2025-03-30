<template>
  <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="First Name" name="firstName">
      <a-input v-model:value="formState.firstName" />
    </a-form-item>
    <a-form-item label="Last Name" name="lastName">
      <a-input v-model:value="formState.lastName" />
    </a-form-item>
    <a-form-item label="Phone Number" name="phone"
      :rules="[{ required: true, message: 'Please enter a phone number' }, { pattern: /^[0-9]{10}$/, message: 'Please enter a valid phone number (10 digits)' }]">
      <a-input v-model:value="formState.phone" />
    </a-form-item>
    <a-form-item label="Email" name="email"
      :rules="[{ required: true, message: 'Please input your email' }, { type: 'email', message: 'Please enter a valid email address' }]">
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item label="Gender" name="gender" :rules="[{ required: true, message: 'Please select gender' }]">
      <a-radio-group v-model:value="formState.gender">
        <a-radio value="male">Male</a-radio>
        <a-radio value="female">Female</a-radio>
        <a-radio value="other">Other</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Age" name="age">
      <a-input-number v-model:value="formState.age" min="1" max="120" placeholder="Enter your age" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Update</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      <a-button style="margin-left: 10px" @click="handleback">Back</a-button>
    </a-form-item>
  </a-form>
  <a-modal v-model:visible="showConfirmation" title="Contact Updated" @ok="handleOk" @cancel="handleCancel">
    <p>Your contact has been updated successfully!</p>
  </a-modal>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { UnwrapRef } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  age: number | undefined;
}

const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const showConfirmation = ref(false);

const formState: UnwrapRef<FormState> = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  gender: 'male',
  age: undefined,
});


const route = useRoute();
const router = useRouter();


const contactId = ref();
const contactToEdit = ref(null);

const loadContact = () => {
  contactId.value = route.params.id;
  const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  contactToEdit.value = contacts.find(contact => contact.id === parseInt(contactId.value));

  if (contactToEdit.value) {
    formState.firstName = contactToEdit.value.firstName;
    formState.lastName = contactToEdit.value.lastName;
    formState.phone = contactToEdit.value.phone;
    formState.email = contactToEdit.value.email;
    formState.gender = contactToEdit.value.gender;
    formState.age = contactToEdit.value.age;
  }
};


onMounted(loadContact);

const rules: Record<string, Rule[]> = {
  firstName: [{ required: true, message: 'Please input your first name', trigger: 'blur' }],
  lastName: [{ required: true, message: 'Please input your last name', trigger: 'blur' }],
  phone: [
    { required: true, message: 'Please enter a phone number', trigger: 'blur' },
    { pattern: /^[0-9]{10}$/, message: 'Please enter a valid phone number (10 digits)', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please input your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
  ],
  gender: [{ required: true, message: 'Please select gender', trigger: 'change' }],
  age: [{ required: true, message: 'Please input your age', trigger: 'blur' }],
};


const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {

      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      const contactIndex = contacts.findIndex(contact => contact.id === parseInt(contactId.value));

      if (contactIndex !== -1) {
        contacts[contactIndex] = { ...formState, id: parseInt(contactId.value) };
        localStorage.setItem('contacts', JSON.stringify(contacts));
        showConfirmation.value = true;
      }
    })
    .catch((error) => {
      console.log('Validation failed:', error);
    });
};

const resetForm = () => {
  formRef.value.resetFields();
};

const handleback = () => {
  router.push({ name: 'ContactList' });
};

const handleOk = () => {
  showConfirmation.value = false;
  router.push({ name: 'ContactDetails', params: { id: contactId.value } });
};

const handleCancel = () => {
  showConfirmation.value = false;
};
</script>

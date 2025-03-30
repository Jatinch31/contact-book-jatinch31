<template>
  <a-card title="Contact Details" style="width: 100%">
    <p><strong>First Name:</strong> {{ contact.firstName }}</p>
    <p><strong>Last Name:</strong> {{ contact.lastName }}</p>
    <p><strong>Phone:</strong> {{ contact.phone }}</p>
    <p><strong>Email:</strong> {{ contact.email }}</p>
    <p><strong>Age:</strong> {{ contact.age }}</p>
    <p><strong>Gender:</strong> {{ contact.gender }}</p>
    <a-button @click="goBack" type="primary">Back to List</a-button>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      contact: {},
    };
  },
  created() {
    const contactId = this.$route.params.id;
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactToView = contacts.find((contact) => contact.id === parseInt(contactId));

    if (contactToView) {
      this.contact = { ...contactToView };
    } else {
      this.$router.push({ name: 'ContactList' });
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'ContactList' });
    },
  },
};
</script>

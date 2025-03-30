<template>
  <div>
    <a-input v-model:value="searchQuery" placeholder="Search by name" style="margin-bottom: 20px;" />
    <a-button type="primary" @click="goToAddContactPage" style="margin-bottom: 20px;">
      Add Contact
    </a-button>
    <a-list item-layout="horizontal" :data-source="filteredContacts" bordered>
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a @click="editContact(item.id)" key="edit">Edit</a>
            <a @click="showDeleteConfirmation(item.id)" key="delete" danger>Delete</a>
          </template>
          <a-list-item-meta>
            <template #title>
              <a @click="goToDetailsPage(item.id)">
                {{ `${item.firstName} ${item.lastName}` }}
              </a>
            </template>
            <template #description>
              {{ item.email }}
            </template>
            <template #avatar>
              <a-avatar>{{ item.lastName.charAt(0).toUpperCase() }}</a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>

    <a-modal v-model:visible="showConfirmationModal" title="Delete Contact" @ok="deleteContact" @cancel="handleCancel">
      <p>Are you sure you want to delete this contact?</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: JSON.parse(localStorage.getItem('contacts')) || [],
      showConfirmationModal: false,
      contactIdToDelete: null,
      searchQuery: '',
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts
        .filter((contact) => {
          const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
          return fullName.includes(this.searchQuery.toLowerCase());
        })
        .sort((a, b) => a.lastName.localeCompare(b.lastName));
    },
  },
  methods: {
    editContact(id) {
      this.$router.push({ name: 'EditContact', params: { id } });
    },


    showDeleteConfirmation(id) {
      this.contactIdToDelete = id;
      this.showConfirmationModal = true;
    },


    deleteContact() {
      const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      const updatedContacts = contacts.filter((contact) => contact.id !== this.contactIdToDelete);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      this.contacts = updatedContacts;
      this.showConfirmationModal = false;
    },

    handleCancel() {
      this.showConfirmationModal = false;
    },

    goToAddContactPage() {
      this.$router.push({ name: 'AddContact' });
    },

    goToDetailsPage(id) {
      this.$router.push({ name: 'ContactDetails', params: { id } });
    },
  },
  watch: {
    contacts(newContacts) {
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    },
  },
};
</script>

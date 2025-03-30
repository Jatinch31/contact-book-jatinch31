import { createRouter, createWebHistory } from 'vue-router';
import AddContact from '../components/AddContact.vue';
import EditContact from '../components/EditContact.vue';
import ContactList from '../components/ContactList.vue';
import ContactDetails from '../components/ContactDetails.vue';

const routes = [
    {
        path: '/',
        name: 'ContactList',
        component: ContactList,
    },
    {
        path: '/add',
        name: 'AddContact',
        component: AddContact,
    },
    {
        path: '/edit/:id',
        name: 'EditContact',
        component: EditContact,
    },
    {
        path: '/details/:id',
        name: 'ContactDetails',
        component: ContactDetails,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

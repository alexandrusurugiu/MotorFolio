<template>
    <v-card class="pa-6 rounded-xl elevation-4 mb-4">
        <v-card-title class="font-weight-bold">
            Add phase
        </v-card-title>

        <v-card-text>
            <v-text-field label="Title" v-model="formData.title" placeholder="ex: Rust removal" variant="outlined"></v-text-field>
            <v-text-field label="Description" v-model="formData.description" placeholder="ex: Details about the restoration work" variant="outlined"></v-text-field>
            <v-date-picker label="Date" v-model="formData.date"></v-date-picker>
            <v-text-field label="Price" v-model="formData.price" placeholder="0" variant="outlined"></v-text-field>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="$emit('close')">Cancel</v-btn>
            <v-btn color="purple-accent-4" variant="flat" @click="saveRestoration">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';

    const emit = defineEmits(['close', 'refresh']);

    const formData = ref({
        title: '',
        description: '',
        date: new Date(),
        price: 0,
    });

    const saveRestoration = async () => {
        try {
            if (!formData.value.title) {
                alert('Please fill in the Title field!');
                return;
            }

            const user = JSON.parse(localStorage.getItem('user'));

            await axios.post('http://localhost:5000/server/restoration/add-restoration', {
                userId: user.id,
                title: formData.value.title,
                description: formData.value.description,
                date: formData.value.date,
                price: formData.value.price
            });

            emit('refresh');
            emit('close');
        } catch (error) {
            console.error('Error when trying to save the restoration: ', error.message);
        }
    };
</script>
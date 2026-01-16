<template>
    <v-card class="pa-6 rounded-xl elevation-4 mb-4">
        <v-card-title class="font-weight-bold">
            Add maintenance work
        </v-card-title>

        <v-card-text>
            <v-form ref="form">
                <v-text-field label="Title" v-model="formData.title" placeholder="ex:Oil change" variant="outlined"></v-text-field>
                <v-text-field label="Description" v-model="formData.description" placeholder="Details about the maintenance work" variant="outlined"></v-text-field>
                <v-date-picker label="Date" v-model="formData.date"></v-date-picker>
                <v-text-field label="Price" v-model="formData.price" placeholder="0" variant="outlined"></v-text-field>
                <v-text-field label="Mileage" v-model="formData.mileage" placeholder="0" variant="outlined"></v-text-field>
            </v-form>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="$emit('close')">Cancel</v-btn>
            <v-btn color="blue-accent-4" variant="flat" @click="saveMaintenance">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';

    const emit = defineEmits(['close', 'save']);

    const formData = ref({
        title: '',
        description: '',
        date: new Date(),
        price: 0,
        mileage: 0
    });

    const saveMaintenance = async () => {
        try {
            if (!formData.value.title || !formData.value.price) {
                alert('Please fill in Title and Price fields!');
                return;
            }

            const user = JSON.parse(localStorage.getItem('user'));

            await axios.post('http://localhost:5000/server/maintenance/add-maintenance', {
                userId: user.id,
                title: formData.value.title,
                description: formData.value.description,
                date: formData.value.date,
                price: formData.value.price,
                mileage: formData.value.mileage
            });

            emit('refresh');
            emit('close');
        } catch (error) {
            console.error('Error when trying to save the maintenance: ', error.message);
        }
    }; 
</script>
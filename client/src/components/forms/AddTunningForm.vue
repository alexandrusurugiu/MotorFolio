<template>
    <v-card class="pa-6 rounded-xl elevation-4 mb-4">
        <v-card-title class="font-weight-bold">
            {{ isEditMode ? 'Edit tunning' : 'Add tunning' }}
        </v-card-title>

        <v-card-text>
            <v-text-field label="Title" v-model="formData.title" placeholder="ex: Turbo K04 Upgrade" variant="outlined"></v-text-field>
            <v-text-field label="Description" v-model="formData.description" placeholder="ex: Details about the modification" variant="outlined"></v-text-field>
            <v-select label="Category" v-model="formData.category" :items="['Engine', 'Suspension', 'Exhaust', 'Wheels', 'Exterior', 'Interior']" variant="outlined"></v-select>
            <v-date-picker label="Date" v-model="formData.date"></v-date-picker>
            <v-text-field label="Price" v-model="formData.price" placeholder="0" variant="outlined"></v-text-field>
            <v-text-field label="Power gained" v-model="formData.powerGained" placeholder="0" variant="outlined"></v-text-field>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="$emit('close')">Cancel</v-btn>
            <v-btn color="orange-accent-4" variant="flat" @click="saveTunning">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import axios from 'axios';

    const emit = defineEmits(['close', 'refresh']);

    const props = defineProps({
        editData: {
            type: Object,
            default: null
        }
    });

    const isEditMode = computed(() => props.editData !== null);

    const formData = ref({
        title: '',
        description: '',
        category: '',
        date: new Date(),
        price: 0,
        powerGained: 0
    });

    const saveTunning = async () => {
        try {
            if (!formData.value.title || !formData.value.price) {
                alert('Please fill in Title and Price fields!');
                return;
            }

            const user = JSON.parse(localStorage.getItem('user'));

            const payload = {
                userId: user.id,
                title: formData.value.title,
                description: formData.value.description,
                category: formData.value.category,
                date: formData.value.date,
                price: Number(formData.value.price),
                powerGained: Number(formData.value.powerGained)
            };

            if (isEditMode.value) {
                await axios.put(`http://localhost:5000/server/tunning/update/${props.editData.id}`, payload);
            } else {
                await axios.post(`http://localhost:5000/server/tunning/add-tunning`, payload);
            }

            emit('refresh');
            emit('close');
        } catch (error) {
            console.error('Error when trying to save the tunning: ', error.message);
        }
    };

    onMounted(() => {
        if (isEditMode.value) {
            formData.value = {
                title: props.editData.title,
                description: props.editData.description,
                category: props.editData.category,
                date: new Date(props.editData.date),
                price: props.editData.price,
                powerGained: props.editData.powerGained
            };
        }
    });
</script>
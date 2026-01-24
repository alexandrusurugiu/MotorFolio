<template>
    <v-card class="pa-6 rounded-xl elevation-4 mb-4">
        <v-card-title class="font-weight-bold">
            {{ isEditMode ? 'Edit tunning' : 'Add tunning' }}
        </v-card-title>

        <v-card-text>
            <v-form ref="form" @submit.prevent="saveTunning">
                <v-text-field label="Title" v-model="formData.title" placeholder="ex: Turbo K04 Upgrade" variant="outlined" :rules="[rules.required, rules.maxTitle]"></v-text-field>
                <v-text-field label="Description" v-model="formData.description" placeholder="ex: Details about the modification" variant="outlined" :rules="[rules.maxDescription]"></v-text-field>
                <v-select label="Category" v-model="formData.category" :items="['Engine', 'Suspension', 'Exhaust', 'Wheels', 'Exterior', 'Interior']" variant="outlined" :rules="[rules.required]"></v-select>
                <v-date-picker label="Date" v-model="formData.date" :rules="[rules.noFutureDate]"></v-date-picker>
                <v-text-field label="Price" v-model="formData.price" placeholder="0" variant="outlined" :rules="[rules.positive]"></v-text-field>
                <v-text-field label="Power gained" v-model="formData.powerGained" placeholder="0" variant="outlined" :rules="[rules.number, rules.positive]"></v-text-field>
            </v-form>
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
    const form = ref(null);

    const props = defineProps({
        editData: {
            type: Object,
            default: null
        }
    });

    const rules = {
        required: v => !!v || 'Field is required!',
        positive: v => v >= 0 || 'Must be positive!',
        number: v => !isNaN(parseFloat(v)) || 'Must be a number!',
        maxTitle: v => (v && v.length <= 50) || 'Title must be less than 50 characters long!',
        maxDescription: v => (v && v.length <= 500) || 'Description must be less than 500 characters long!',
        noFutureDate: v => {
            if (!v) {
                return true;
            }

            return new Date(v) <= new Date() || 'Date cannot be in the future!';
        }
    }

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
        const { valid } = await form.value.validate();
        if (!valid) {
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));

            const payload = {
                title: formData.value.title,
                description: formData.value.description,
                category: formData.value.category,
                date: formData.value.date,
                price: Number(formData.value.price),
                powerGained: Number(formData.value.powerGained)
            };

            if (isEditMode.value) {
                await axios.put(`/server/tunning/update/${props.editData.id}`, payload);
            } else {
                await axios.post('/server/tunning/add-tunning', payload);
            }

            emit('refresh');
            emit('close');
        } catch (error) {
            console.error('Error when trying to save the tunning: ', error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                alert(error.response.data.errors[0].message);
            } else {
                alert('An error occured!');
            }
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
<template>
    <v-card class="pa-6 rounded-xl elevation-4 mb-4">
        <v-card-title class="font-weight-bold">
            {{ idEditMode ? 'Edit maintenance' : 'Add maintenance' }}
        </v-card-title>

        <v-card-text>
            <v-form ref="form" @submit.prevent="saveMaintenance">
                <v-text-field label="Title" v-model="formData.title" placeholder="ex:Oil change" variant="outlined" :rules="[rules.required]"></v-text-field>
                <v-text-field label="Description" v-model="formData.description" placeholder="Details about the maintenance work" variant="outlined"></v-text-field>
                <v-date-picker label="Date" v-model="formData.date"></v-date-picker>
                <v-text-field label="Price" v-model="formData.price" placeholder="0" variant="outlined" :rules="[rules.positive]"></v-text-field>
                <v-text-field label="Mileage" v-model="formData.mileage" placeholder="0" variant="outlined" :rules="[rules.required, rules.positive]"></v-text-field>
            </v-form>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="$emit('close')">Cancel</v-btn>
            <v-btn color="blue-accent-4" variant="flat" @click="saveMaintenance">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import axios from 'axios';

    const emit = defineEmits(['close', 'refresh']);
    const form = ref(null);

    const rules = {
        required: v => !!v || 'Field is required!',
        positive: v => v >= 0 || 'Must be a positive number!'
    };

    const props = defineProps({
        editData: {
            type: Object,
            default: null
        }
    });

    const isEditMode = computed(() => props.editData !== null)

    const formData = ref({
        title: '',
        description: '',
        date: new Date(),
        price: 0,
        mileage: 0
    });

    const saveMaintenance = async () => {
        const { valid } = await form.value.validate();
        if (!valid) {
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));

            const payload =  {
                userId: user.id,
                title: formData.value.title,
                description: formData.value.description,
                date: formData.value.date,
                price: Number(formData.value.price),
                mileage: Number(formData.value.mileage)
            };

            if (isEditMode.value) {
                await axios.put(`http://localhost:5000/server/maintenance/update/${props.editData.id}`, payload);
            } else {
                await axios.post(`http://localhost:5000/server/maintenance/add-maintenance`, payload);
            }

            emit('refresh');
            emit('close');
        } catch (error) {
            console.error('Error when trying to save the maintenance: ', error.message);

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
                date: new Date(props.editData.date),
                price: props.editData.price,
                mileage: props.editData.mileage
            };
        }
    });
</script>
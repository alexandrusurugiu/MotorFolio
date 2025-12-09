<template>
    <v-card class="pa-6 rounded-xl elevation-4 mb-4">
        <v-card-title class="font-weight-bold">
            Add maintenance work
        </v-card-title>

        <v-card-text>
            <v-form ref="form">
                <v-text-field label="Title" placeholder="ex:Oil change" variant="outlined"></v-text-field>
                <v-text-field label="Description" placeholder="Details about the maintenance work" variant="outlined"></v-text-field>
                <v-date-picker label="Date"></v-date-picker>
                <v-text-field label="Price" placeholder="0" variant="outlined"></v-text-field>
                <v-text-field label="Mileage" placeholder="0" variant="outlined"></v-text-field>
            </v-form>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="$emit('close')">Cancel</v-btn>
            <v-btn color="blue-accent-4" variant="flat" @click="$emit('save')">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>
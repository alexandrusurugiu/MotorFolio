<template>
    <v-card class="pa-6 rounded-xl elevation-4 mb-4">
        <v-card-title class="font-weight-bold">
            Add modification
        </v-card-title>

        <v-card-text>
            <v-text-field label="Title" placeholder="ex: Turbo K04 Upgrade" variant="outlined"></v-text-field>
            <v-text-field label="Description" placeholder="ex: Details about the modification" variant="outlined"></v-text-field>
            <v-select label="Category" :items="['Engine', 'Suspension', 'Exhaust', 'Wheels', 'Exterior', 'Interior']" variant="outlined"></v-select>
            <v-date-picker label="Date"></v-date-picker>
            <v-text-field label="Price" placeholder="0" variant="outlined"></v-text-field>
            <v-text-field label="Power gained" placeholder="0" variant="outlined"></v-text-field>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="$emit('close')">Cancel</v-btn>
            <v-btn color="orange-accent-4" variant="flat" @click="$emit('save')">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>
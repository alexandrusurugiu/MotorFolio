<template>
    <v-card class="pa-6 rounded-xl elevation-4 mb-4">
        <v-card-title class="font-weight-bold">
            Add phase
        </v-card-title>

        <v-card-text>
            <v-text-field label="Title" placeholder="ex: Rust removal" variant="outlined"></v-text-field>
            <v-text-field label="Description" placeholder="ex: Details about the restoration work" variant="outlined"></v-text-field>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="$emit('close')">Cancel</v-btn>
            <v-btn color="purple-accent-4" variant="flat" @click="$emit('save')">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>
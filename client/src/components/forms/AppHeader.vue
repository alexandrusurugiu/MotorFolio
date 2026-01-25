<template>
    <v-row class="w-100 mb-8 mt-2" no-gutters>

        <v-col cols="2" class="d-flex align-center justify-start">
            <v-img :src="appLogo" width="80" height="80" contain class="mr-4"></v-img>

            <div class="text-white text-left">
                <h1 class="text-h4 font-weight-bold">MotorFolio</h1>
                <p class="text-subtitle-1 opacity-80">Welcome back, {{ authStore.userName }}!</p>
            </div>
        </v-col>

        <v-col cols="10" class="d-flex align-center justify-end">
            <v-btn
                variant="outlined"
                color="white"
                size="large"
                rounded="pill"
                class="px-6"
                prepend-icon="mdi-logout"
                @click="handleDisconnect">
                    Disconnect
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
    import appLogo from '@/assets/app-logo.png';
    import { useAuthStore } from '@/stores/auth';

    const authStore = useAuthStore();

    const handleDisconnect = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        window.location.href = '/'; 
    };
</script>

<style>
    .opacity-80 {
        opacity: 0.8;
    }
</style>
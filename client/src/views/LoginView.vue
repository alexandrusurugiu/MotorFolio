<template>
    <v-container fluid class='fill-height bg-image'>
        <v-row align="center" justify="center">
            <v-col cols="12" md="4" class="text-white pa-5">
                <div class="d-flex-col logo">
                    <v-img :src="appLogo" width="200" height="200" contain></v-img>
                    <div>
                        <h1 class="text-h3">MotorFolio</h1>
                        <p class="text-h6">Your digital journal for auto restoration & tuning</p>
                        <div class="d-flex align-center mb-2">
                            <v-icon class="mr-3" color="grey-lighten-1">mdi-wrench</v-icon>
                            <span>Track vehicle maintenance</span>
                        </div>
                        <div class="d-flex align-center mb-2">
                            <v-icon class="mr-3" color="orange">mdi-flash</v-icon>
                            <span>Document tuning & mods</span>
                        </div>
                        <div class="d-flex align-center mb-2">
                            <v-icon class="mr-3" color="yellow">mdi-star</v-icon>
                            <span>Monitor restoration progress</span>
                        </div>
                    </div>
                </div>
            </v-col>

            <v-col cols="12" md="4">
        
                <v-card class="elevation-12 rounded-lg pa-5">
                    
                    <v-tabs v-model="tab" align-tabs="center" color="black">
                        <v-tab value="login">Login</v-tab>
                        <v-tab value="register">Register</v-tab>
                    </v-tabs>

                    <v-card-text class="mt-4">
                        <v-expand-transition>
                            <v-text-field v-if="tab === 'register'" label="Name" prepend-inner-icon="mdi-account" variant="outlined"></v-text-field>
                        </v-expand-transition>
                        
                        <v-text-field label="Email" prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>
                        <v-text-field label="Password" type="password" prepend-inner-icon="mdi-lock-outline" variant="outlined"></v-text-field>

                        <v-expand-transition>
                            <v-text-field v-if="tab === 'register'" label="Confirm Password" type="password" prepend-inner-icon="mdi-lock-outline" variant="outlined"></v-text-field>
                        </v-expand-transition>

                        <v-btn block color="black" size="large" class="mt-4 text-white">
                            <span v-if="tab === 'login'">Sign In</span>
                            <span v-else>Create account</span>
                        </v-btn>  
                        
                        <v-btn v-if="tab === 'login'" block color="red-darken-3" size="large" class="mt-4 text-white">
                            <span>Sign In with Google</span>
                        </v-btn>  
                    </v-card-text>

                </v-card>

                <v-slide-y-transition v-if="tab === 'login'">
                    <v-card class="elevation-3 rounded-lg pa-4 mt-4 d-flex justify-center">
                        <v-icon class="mr-3" color="yellow-darken-3">mdi-lightbulb-on</v-icon>
                        <span class="create-account-text font-weight-bold">Kickstart your build — Create an account now!</span>
                    </v-card>
                </v-slide-y-transition>

            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import { ref } from 'vue';
    import appLogo from '@/assets/app-logo.png';

    const tab = ref('login');
</script>

<style scoped>
.bg-image {
    position: relative;
    height: 100vh;
    width: 100%;
}

.bg-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://images.pexels.com/photos/9416/light-car-display-shop.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(6px);
    z-index: 0;
}

.logo {
    position: relative;
    z-index: 1;
}

.text-h3 {
    font-family: 'Montserrat';
    font-weight: 550;
    position: relative;
    z-index: 1;
}

.text-h6 {
    font-family: 'Open Sans';
    position: relative;
    z-index: 1;
}

.mt-5 {
    font-family: 'Open Sans';
    position: relative;
    z-index: 1;
}

.create-account-text {
    font-family: 'Open Sans';
    position: relative;
    z-index: 1;
    text-align: center;
}
</style>
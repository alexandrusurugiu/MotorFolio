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

                    <v-alert
                        v-if="errorMessage"
                        type="error"
                        variant="tonal"
                        class="mb-4"
                        closable
                        @click:close="errorMessage = ''"
                    >
                        {{ errorMessage }}
                    </v-alert>
                    
                    <v-tabs v-model="tab" align-tabs="center" color="black">
                        <v-tab value="login">Login</v-tab>
                        <v-tab value="register">Register</v-tab>
                    </v-tabs>

                    <v-card-text class="mt-4">
                        <v-expand-transition>
                            <v-text-field v-if="tab === 'register'" label="Name" v-model="formData.name" prepend-inner-icon="mdi-account" variant="outlined"></v-text-field>
                        </v-expand-transition>
                        
                        <v-text-field label="Email" v-model="formData.email" prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="[rules.emailRequired, rules.emailValid]"></v-text-field>
                        
                        <v-text-field label="Password" v-model="formData.password" type="password" prepend-inner-icon="mdi-lock-outline" variant="outlined" :rules="[rules.passwordMin, rules.passwordRequired]"></v-text-field>
                        <div v-if="tab === 'login'" class="d-flex justify-end mt-n3 mb-8">
                            <span class="text-caption font-weight-bold text-grey-darken-1" style="cursor: pointer;" @click="showForgotPasswordDialog = true">Forgot password?</span>
                        </div>
 

                        <v-expand-transition>
                            <v-text-field v-if="tab === 'register'" label="Confirm Password" v-model="formData.confirmPassword" type="password" prepend-inner-icon="mdi-lock-outline" variant="outlined" :rules="[rules.confirmPasswordRequired, rules.confirmPasswordMatch]"></v-text-field>
                        </v-expand-transition>

                        <v-btn block color="black" size="large" @click="handleSubmit" :loading="loading" class="mt-4 text-white">
                            <span v-if="tab === 'login'">Sign In</span>
                            <span v-else>Create account</span>
                        </v-btn>  
                        
                        <v-btn v-if="tab === 'login'" block color="red-darken-3" prepend-icon="mdi-google" @click="handleGoogleLogin" :loading="loading" size="large" class="mt-4 text-white">
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

        <v-dialog v-model="showForgotPasswordDialog" max-width="450">
            <v-card class="rounded-xl pa-4 elevation-12">
                <v-card-title class="text-h6 font-weight-bold">
                    Reset password
                </v-card-title>

                <v-card-text>
                    <p class="text-body-2 text-grey-darken-1 mb-4">
                        Enter your email address where we can send you a link to reset your password.
                    </p>

                    <v-text-field 
                        v-model="resetEmail" 
                        label="Enter your email" 
                        prepend-inner-icon="mdi-email-outline" 
                        variant="outlined" 
                        density="comfortable" 
                        autofocus 
                        @keyup.enter="handlePasswordReset"  
                    ></v-text-field>
                </v-card-text>

                <v-card-actions class="justify-end">
                        <v-btn variant="text" color="grey-darken-4" @click="showForgotPasswordDialog = false">
                            Cancel
                        </v-btn>

                        <v-btn variant="flat" color="blue-darken-2" :loading="resetLoading" @click="handlePasswordReset">
                            Send link
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
    import { ref } from 'vue';
    import appLogo from '@/assets/app-logo.png';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { signInWithPopup, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
    import { auth, googleProvider } from '@/firebaseConfig'

    const tab = ref('login');
    const router = useRouter();
    const loading = ref(false);
    const errorMessage = ref('');
    const showForgotPasswordDialog = ref(false);
    const resetEmail = ref('');
    const resetLoading = ref(false);
    const url = 'http://localhost:5000/server/auth';
    const rules = {
        emailRequired: v => !!v || 'Email is required!',
        emailValid: v => /.@.+\../.test(v) || 'Email must be valid!',
        passwordRequired: v => !!v || 'Password is required!',
        passwordMin: v => (v && v.length >= 6) || 'Password must be at least 6 characters long!',
        confirmPasswordRequired: v => !!v || 'Please confirm your password!',
        confirmPasswordMatch: v => v === formData.value.password || 'Password do not match!'
    };

    const formData = ref({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const processToken = async(firebaseToken) => {
        const response = await axios.post(`${url}/verify-token`, {
            token: firebaseToken
        });

        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        router.push('/maintenance');
    }

    const handleSubmit = async() => {
        loading.value = true;
        errorMessage.value = '';

        try {

            if (tab.value === 'register') {
                if (formData.value.password !== formData.value.confirmPassword) {
                    errorMessage.value = 'Passwords do not match!';
                    loading.value = false;
                    return;
                }

                const userCredential = await createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password);
                const firebaseUser = userCredential.user;

                await updateProfile(firebaseUser, {
                    displayName: formData.value.name
                });

                const token = await firebaseUser.getIdToken(true);

                await processToken(token);
            } else {
                const userCredential = await signInWithEmailAndPassword(auth, formData.value.email, formData.value.password);
                const firebaseToken = await userCredential.user.getIdToken();
                await processToken(firebaseToken);
            } 
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                errorMessage.value = 'This email is already registered!';
            } else if (error.code === 'auth-invalid-credential' || error.code === 'auth/wrong-password') {
                errorMessage.value = 'Invalid email or password!';
            } else if (error.response && error.response.data) {
                if (error.response.data.errors) {
                    errorMessage.value = error.response.data.errors[0].msg;
                } else if (error.response.data.message) {
                    errorMessage.value = error.response.data.message;
                }
            } else {
                errorMessage.value = 'An error occured. Please try again later!';
            }
        } finally {
            loading.value = false;
        }
    };

    const handleGoogleLogin = async() => {
        loading.value = true;
        errorMessage.value = '';

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await user.getIdToken();
            await processToken(token);
        } catch (error) {
            console.log(error);
                
            if (error.response && error.response.data) {
                errorMessage.value = error.response.data.message;
            } else {
                errorMessage.value = 'Failed to login via Google account!';
            }
        } finally {
            loading.value = false;
        }
    };

    const handlePasswordReset = async () => {
        if (!resetEmail.value) {
            errorMessage.value = "Please enter your email address!";
            return;
        }

        resetLoading.value = true;
        errorMessage.value = '';

        try {
            await sendPasswordResetEmail(auth, resetEmail.value);

            showForgotPasswordDialog.value = false;
            resetEmail.value = '';
            alert('Password reset email sent! Please check your inbox!');
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/user-not-found') {
                errorMessage.value = 'No user found with this email!';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage.value = "Invalid email address";
            } else {
                errorMessage.value = 'Failed to send the reset password form. Please try again!';
            }
        } finally {
            resetLoading.value = false;
        }
    };
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
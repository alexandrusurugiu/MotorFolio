<template>
    <div class="maintenance-page">
        <div class="background-layer"></div>
        <div class="content-layer">
            <v-container fluid class="fill-height align-start pa-6">
                
                <AppHeader></AppHeader>

                <v-row class="w-100 mb-8">
                    <v-col cols="12" md="4">
                        <v-card class="action-card h-100 d-flex flex-column align-center justify-center py-8 rounded-xl elevation-10" color="blue-lighten-5">
                            <div class="icon-circle bg-blue-accent-4 mb-4 elevation-4">
                                <v-icon icon="mdi-wrench" size="32" color="white"></v-icon>
                            </div>
                            <h2 class="text-h5 font-weight-bold text-blue-darken-4">Maintenance</h2>
                            <v-progress-linear model-value="100" color="blue-accent-4" height="6" rounded class="mt-4 w-50"></v-progress-linear>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-card class="action-card h-100 d-flex flex-column align-center justify-center py-8 rounded-xl elevation-4" color="orange-lighten-5" @click="goToTunningPage">
                            <div class="icon-circle bg-orange-darken-1 mb-4">
                                <v-icon icon="mdi-flash" size="32" color="white"></v-icon>
                            </div>
                            <h2 class="text-h5 font-weight-bold text-orange-darken-3">Tuning</h2>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-card class="action-card h-100 d-flex flex-column align-center justify-center py-8 rounded-xl elevation-4" color="purple-lighten-5" @click="goToRestorationPage">
                            <div class="icon-circle bg-purple-accent-3 mb-4">
                                <v-icon icon="mdi-star-four-points" size="32" color="white"></v-icon>
                            </div>
                            <h2 class="text-h5 font-weight-bold text-purple-darken-3">Restoration</h2>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row class="w-100">
                    <v-col cols="12" md="6">
                        <v-card class="pa-6 rounded-xl elevation-4 d-flex align-center">
                            <v-icon icon="mdi-calendar-check" color="blue" size="40" class="mr-4"></v-icon>
                            <div>
                                <div class="text-subtitle-1">Number of maintenance work done</div>
                                <!--Also dynamic -->
                                <div class="text-h4 font-weight-bold">3</div>
                            </div>
                        </v-card>
                    </v-col>
                    
                    <v-col cols="12" md="6">
                        <v-card class="pa-6 rounded-xl elevation-4 mb-4">
                            <div class="d-flex align-center">
                                <v-icon icon="mdi-cash" color="green" size="40" class="mr-4"></v-icon>
                                <div>
                                    <div class="text-subtitle-1">Total</div>
                                    <!--Dynamic number based on the maintenance work costs-->
                                    <div class="text-h4 font-weight-bold">1590 RON</div>
                                </div>
                            </div>
                        </v-card>

                        <div class="d-flex justify-end w-100">
                            <v-btn 
                                color="blue-accent-4" 
                                size="large" 
                                rounded="xl" 
                                class="elevation-6 mt-4"
                                prepend-icon="mdi-plus"
                                @click="showMaintenanceDialog = true"
                            >
                                Add maintenance
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

                <v-dialog v-model="showMaintenanceDialog" max-width="600">
                    <AddMaintenanceForm @close="showMaintenanceDialog = false"></AddMaintenanceForm>
                </v-dialog>

                <v-row class="w-100 mt-6">
                    <v-col cols="12">
                        <v-card class="rounded-xl elevation-6 pa-4">
                            
                            <v-card-title class="text-h6 font-weight-bold mb-4 pl-2">
                                Maintenance History
                            </v-card-title>

                            <v-card flat class="bg-blue-lighten-5 rounded-lg pa-4 mb-4 history-item">
                                <!--The name and the description also volatile-->
                                <h3 class="text-h6 font-weight-bold text-blue-darken-4 mb-1">Oil and filter change</h3>
                                <p class="text-body-2 text-blue-darken-2 mb-3">5W-30 Castrol oil, oil filter, air filter, cabin filter</p>
                                
                                <div class="d-flex flex-wrap align-center">
                                    <div class="d-flex align-center mr-6">
                                        <v-icon icon="mdi-calendar" size="small" color="blue" class="mr-2"></v-icon>
                                        <!--The date should also be volatile-->
                                        <span class="text-body-2 text-blue font-weight-medium">November 15, 2024</span>
                                    </div>
                                    <div class="d-flex align-center mr-6">
                                        <v-icon icon="mdi-currency-usd" size="small" color="green" class="mr-2"></v-icon>
                                        <!--The price of the maintenance should be volatile-->
                                        <span class="text-body-2 text-green font-weight-bold">350 RON</span>
                                    </div>
                                    <div class="d-flex align-center">
                                        <v-icon icon="mdi-speedometer" size="small" color="purple" class="mr-2"></v-icon>
                                        <!--The km of the car should be volatile-->
                                        <span class="text-body-2 text-purple font-weight-medium">145,000 km</span>
                                    </div>
                                </div>
                            </v-card>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script setup>
import AddMaintenanceForm from '@/components/forms/AddMaintenanceForm.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import AppHeader from '@/components/forms/AppHeader.vue';

const showMaintenanceDialog = ref(false);
const router = useRouter();

function goToTunningPage() {
    router.push('/tunning');
}

function goToRestorationPage() {
    router.push('/restoration');
}
</script>

<style scoped>
.maintenance-page {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background-color: #1a1a1a;
}

.background-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://images.pexels.com/photos/4488660/pexels-photo-4488660.jpeg');
    background-size: cover;
    background-position: center;
    filter: blur(8px) brightness(0.6); 
    z-index: 0;
    transform: scale(1.05);
}

.content-layer {
    position: relative;
    z-index: 1;
    width: 100%;
}

.icon-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.opacity-80 {
    opacity: 0.8;
}

.action-card {
    transition: transform 0.2s;
}

.action-card:hover {
    transform: translateY(-5px);
}

.history-item {
    border: 1px solid transparent;
    transition: all 0.2s;
}
.history-item:hover {
    border-color: #2196F3;
    background-color: #E3F2FD;
}
</style>
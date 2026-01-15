<template>
    <div class="maintenance-page">
        <div class="background-layer"></div>

        <div class="content-layer">
            <v-container fluid class="fill-height align-start pa-6">
                
                <AppHeader></AppHeader>

                <v-row class="w-100 mb-8">
                    <v-col cols="12" md="4">
                        <v-card class="action-card h-100 d-flex flex-column align-center justify-center py-8 rounded-xl elevation-10" color="blue-lighten-5" @click="goToMaintenancePage">
                            <div class="icon-circle bg-blue-accent-4 mb-4 elevation-4">
                                <v-icon icon="mdi-wrench" size="32" color="white"></v-icon>
                            </div>
                            <h2 class="text-h5 font-weight-bold text-blue-darken-4">Maintenance</h2>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-card class="action-card h-100 d-flex flex-column align-center justify-center py-8 rounded-xl elevation-4" color="orange-lighten-5">
                            <div class="icon-circle bg-orange-darken-1 mb-4">
                                <v-icon icon="mdi-flash" size="32" color="white"></v-icon>
                            </div>
                            <h2 class="text-h5 font-weight-bold text-orange-darken-3">Tunning</h2>
                            <v-progress-linear model-value="100" color="orange-accent-4" height="6" rounded class="mt-4 w-50"></v-progress-linear>
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
                    <v-col cols="12" md="4">
                        <v-card class="pa-6 rounded-xl elevation-4 d-flex align-center">
                            <v-icon icon="mdi-flash" color="yellow-darken-3" size="40" class="mr-4"></v-icon>
                            <div>
                                <div class="text-subtitle-1">Total mods</div>
                                <!--The number should be volatile, changing depending on the number of mods done on the vehicle-->
                                <div class="text-h4 font-weight-bold">3</div>
                            </div>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-card class="pa-6 rounded-xl elevation-4 d-flex align-center">
                            <v-icon icon="mdi-cash" color="green" size="40" class="mr-4"></v-icon>
                            <div>
                                <div class="text-subtitle-1">Investment</div>
                                <!--The number should be volatile, changing depending on the number of mods done on the vehicle-->
                                <div class="text-h4 font-weight-bold">156.700 RON</div>
                            </div>
                        </v-card>
                    </v-col>
                    
                    <v-col cols="12" md="4">
                        <v-card class="pa-6 rounded-xl elevation-4 mb-4">
                            <div class="d-flex align-center">
                                <v-icon icon="mdi-speedometer" color="black" size="40" class="mr-4"></v-icon>
                                <div>
                                    <div class="text-subtitle-1">Horsepower gain</div>
                                    <!--The number should be volatile, changing depending on the cost of the modifications done on the vehicle-->
                                    <div class="text-h4 font-weight-bold">+356 HP</div>
                                </div>
                            </div>
                        </v-card>

                        <div class="d-flex justify-end w-100">
                            <v-btn 
                                color="orange-accent-4" 
                                size="large" 
                                rounded="xl" 
                                class="elevation-6 mt-4"
                                prepend-icon="mdi-plus"
                                @click="showTunningDialog = true"
                            >
                                Add modd
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

                <v-dialog v-model="showTunningDialog" max-width="600">
                    <AddTunningForm @close="showTunningDialog = false"></AddTunningForm>
                </v-dialog>

                <v-row class="w-100 mt-6">
                    <v-col cols="12">
                        <v-card class="rounded-xl elevation-6 pa-6 bg-white">
                            
                            <h2 class="text-h6 font-weight-bold mb-6 text-grey-darken-3 pl-1">
                                Modification List
                            </h2>

                            <v-card flat class="bg-red-lighten-5 rounded-xl pa-5 mb-4 mod-item border-red-thin">
                                <v-chip color="red-accent-3" class="mb-3 font-weight-bold px-4" size="small" label>
                                    <!--Here maybe the icon can change depending on the category?-->
                                    <v-icon start icon="mdi-engine" size="small"></v-icon>
                                    Engine
                                </v-chip>

                                <!--The name of the mod should also be volatile, based on the completed form-->
                                <h3 class="text-h6 font-weight-bold text-red-darken-4 mb-1">Turbo K04 Upgrade</h3>
                                <!--The description of the mod should also be volatile, based on the completed form-->
                                <p class="text-body-2 text-red-darken-3 mb-4 opacity-90">
                                    Turbo upgrade from K03 to K04, larger intercooler, custom piping
                                </p>
                                
                                <div class="d-flex flex-wrap align-center">
                                    <div class="d-flex align-center mr-6 mb-2">
                                        <v-icon icon="mdi-calendar" size="small" color="red-darken-2" class="mr-2"></v-icon>
                                        <!--The date of the mod should also be volatile, based on the completed form-->
                                        <span class="text-caption text-red-darken-4 font-weight-medium">October 15, 2024</span>
                                    </div>
                                    <div class="d-flex align-center mr-6 mb-2">
                                        <v-icon icon="mdi-cash" size="small" color="green-darken-2" class="mr-2"></v-icon>
                                        <!--The price of the mod should also be volatile, based on the completed form-->
                                        <span class="text-caption text-green-darken-3 font-weight-bold">4500 RON</span>
                                    </div>
                                    <div class="d-flex align-center mb-2">
                                        <v-icon icon="mdi-flash" size="small" color="purple-darken-2" class="mr-2"></v-icon>
                                        <!--The power gain of the mod should also be volatile and optional, based on the completed form-->
                                        <span class="text-caption text-purple-darken-3 font-weight-bold">+320 HP</span>
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
import { ref } from 'vue';
import AddTunningForm from '@/components/forms/AddTunningForm.vue';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/forms/AppHeader.vue';

const showTunningDialog = ref(false);
const router = useRouter();

function goToMaintenancePage() {
  router.push('/maintenance');
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
</style>
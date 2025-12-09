<template>
    <div class="maintenance-page">
        <div class="background-layer"></div>
        <div class="content-layer">
            <v-container fluid class="fill-height align-start pa-6">
                <v-row class="w-100 mb-8 mt-2" no-gutters>
                    <v-col cols="2" class="d-flex align-center justify-start">
                        <v-img :src="appLogo" width="80" height="80" contain class="mr-4"></v-img>
                        
                        <div class="text-white text-left">
                            <h1 class="text-h4 font-weight-bold">MotorFolio</h1>
                            <p class="text-subtitle-1 opacity-80">Welcome back, Alex!</p>
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
                        >
                            Disconnect
                        </v-btn>
                    </v-col>
                </v-row>

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
                        <v-card class="action-card h-100 d-flex flex-column align-center justify-center py-8 rounded-xl elevation-4" color="orange-lighten-5" @click="goToTunningPage">
                            <div class="icon-circle bg-orange-darken-1 mb-4">
                                <v-icon icon="mdi-flash" size="32" color="white"></v-icon>
                            </div>
                            <h2 class="text-h5 font-weight-bold text-orange-darken-3">Tuning</h2>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-card class="action-card h-100 d-flex flex-column align-center justify-center py-8 rounded-xl elevation-4" color="purple-lighten-5">
                            <div class="icon-circle bg-purple-accent-3 mb-4">
                                <v-icon icon="mdi-star-four-points" size="32" color="white"></v-icon>
                            </div>
                            <h2 class="text-h5 font-weight-bold text-purple-darken-3">Restoration</h2>
                            <v-progress-linear model-value="100" color="purple-accent-4" height="6" rounded class="mt-4 w-50"></v-progress-linear>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-card class="pa-6 rounded-xl elevation-4 mb-4">
                            <div class="d-flex align-center justify-space-between mb-3">
                                <div class="d-flex align-center">
                                    <v-icon icon="mdi-wrench-clock" color="purple-darken-3" size="40" class="mr-3"></v-icon>
                                    <v-card-title class="text-h6 font-weight-bold pa-0">
                                        Restoration progress
                                    </v-card-title>
                                </div>

                                <div class="text-h5 font-weight-bold">38%</div>
                            </div>

                            <v-progress-linear 
                                model-value="38" 
                                color="purple-darken-3" 
                                height="12" 
                                rounded
                                striped
                            ></v-progress-linear>

                            <div class="text-subtitle-1 font-weight-bold mt-2 text-grey-darken-1"> 
                                3/8 finished phases
                            </div>
                        </v-card>

                        <div class="d-flex justify-end w-100">
                            <v-btn 
                                color="purple-accent-4" 
                                size="large" 
                                rounded="xl" 
                                class="elevation-6 mt-4"
                                prepend-icon="mdi-plus"
                                @click="showRestorationDialog = true"
                            >
                                Add phase
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

                <v-dialog v-model="showRestorationDialog" max-width="600">
                    <AddRestorationForm @close="showRestorationDialog = false"></AddRestorationForm>
                </v-dialog>

                <v-row class="w-100 mt-6">
                    <v-col cols="12">
                        <v-card class="rounded-xl elevation-6 pa-6 bg-white">
                            
                            <h2 class="text-h6 font-weight-bold mb-6 text-grey-darken-3 pl-1">
                                Restoration Stages
                            </h2>

                            <v-timeline density="compact" side="end" align="start" truncate-line="both">
                                
                                <v-timeline-item 
                                    v-for="item in restorationStages" 
                                    :key="item.id"
                                    :dot-color="item.status === 'completed' ? 'green-accent-4' : 'purple-lighten-4'"
                                    :icon="item.status === 'completed' ? 'mdi-check' : 'mdi-circle-outline'"
                                    size="small"
                                    fill-dot
                                >
                                    <v-card 
                                        flat 
                                        class="rounded-lg pa-4 mb-2"
                                        :class="item.status === 'completed' ? 'bg-green-lighten-5 border-green' : 'bg-purple-lighten-5 border-purple'"
                                        style="border: 1px solid transparent;"
                                    >
                                        <div class="d-flex justify-space-between align-start mb-2">
                                            <div class="d-flex flex-wrap gap-2">
                                                <v-chip 
                                                    size="small" 
                                                    :color="item.status === 'completed' ? 'purple-lighten-4' : 'purple-lighten-4'" 
                                                    variant="flat" 
                                                    class="mr-2 font-weight-bold text-purple-darken-2"
                                                >
                                                    {{ item.stage }}
                                                </v-chip>

                                                <v-chip 
                                                    v-if="item.status === 'completed'"
                                                    size="small" 
                                                    color="green-lighten-4" 
                                                    variant="flat" 
                                                    class="font-weight-bold text-green-darken-3"
                                                >
                                                    <v-icon start icon="mdi-check" size="small"></v-icon>
                                                    Finalized
                                                </v-chip>
                                            </div>

                                            <v-btn icon variant="text" density="compact" color="red-lighten-2">
                                                <v-icon icon="mdi-delete-outline"></v-icon>
                                            </v-btn>
                                        </div>

                                        <h3 
                                            class="text-body-1 font-weight-bold mb-1"
                                            :class="item.status === 'completed' ? 'text-green-darken-4 text-decoration-line-through' : 'text-purple-darken-4'"
                                        >
                                            {{ item.title }}
                                        </h3>
                                        
                                        <p 
                                            class="text-body-2 mb-3"
                                            :class="item.status === 'completed' ? 'text-green-darken-3' : 'text-purple-darken-3'"
                                        >
                                            {{ item.description }}
                                        </p>
                                        
                                        <div v-if="item.date" class="d-flex align-center">
                                            <v-icon icon="mdi-calendar" size="small" :color="item.status === 'completed' ? 'green' : 'purple'" class="mr-2"></v-icon>
                                            <span 
                                                class="text-caption font-weight-medium"
                                                :class="item.status === 'completed' ? 'text-green-darken-2' : 'text-purple-darken-2'"
                                            >
                                                {{ item.date }}
                                            </span>
                                        </div>
                                    </v-card>
                                </v-timeline-item>
                            </v-timeline>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import appLogo from '@/assets/app-logo.png';
import { useRouter } from 'vue-router';
import AddRestorationForm from '@/components/forms/AddRestorationForm.vue';

const showRestorationDialog = ref(false);
const router = useRouter();

function goToMaintenancePage() {
    router.push('/maintenance');
}

function goToTunningPage() {
    router.push('/tunning');
}

//Dummy data
const restorationStages = ref([
    {
        id: 1,
        stage: 'Stage 1',
        title: 'Rust treatment and body repair',
        description: 'Rust removal, welding new sheets on sills and wings, anti-corrosion treatment',
        date: 'Finalized: April 20, 2024',
        status: 'completed'
    },
    {
        id: 2,
        stage: 'Stage 2',
        title: 'Priming and filling',
        description: 'Applying epoxy primer, filling to smooth surfaces',
        date: 'Finalized: June 10, 2024',
        status: 'completed'
    },
    {
        id: 3,
        stage: 'Stage 3',
        title: 'Body Painting',
        description: 'Complete painting in original color, applying protective clear coat',
        date: null,
        status: 'pending'
    },
    {
        id: 4,
        stage: 'Stage 4',
        title: 'Engine Rebuild',
        description: 'Engine reconstruction: grinding, new pistons, reconditioned crankshaft',
        date: null,
        status: 'pending'
    }
]);

function toggleStageStatus(id) {
    const stage = restorationStages.value.find(item => item.id === id);
    
    if (stage) {
        if (stage.status === 'pending') {
            stage.status = 'completed';
            stage.date = new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } else {
            stage.status = 'pending';
            stage.date = null;
        }
    }
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

.border-green {
    border-color: rgba(76, 175, 80, 0.3) !important;
}

.border-purple {
    border-color: rgba(156, 39, 176, 0.2) !important;
}

:deep(.v-timeline-divider__line) {
    background: #E1BEE7 !important;
}
</style>
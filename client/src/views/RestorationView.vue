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

                                <div class="text-h5 font-weight-bold">{{ Math.round(progressPercentage) }}%</div>
                            </div>

                            <v-progress-linear 
                                :model-value="progressPercentage" 
                                color="purple-darken-3" 
                                height="12" 
                                rounded
                                striped
                            ></v-progress-linear>

                            <div class="text-subtitle-1 font-weight-bold mt-2 text-grey-darken-1"> 
                                {{ completedStages }}/{{ totalStages }} finished stages
                            </div>
                        </v-card>

                        <div class="d-flex justify-end w-100">
                            <v-btn 
                                color="purple-accent-4" 
                                size="large" 
                                rounded="xl" 
                                class="elevation-6 mt-4"
                                prepend-icon="mdi-plus"
                                @click="openAddDialog"
                            >
                                Add phase
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

                <v-dialog v-model="showRestorationDialog" max-width="600">
                    <AddRestorationForm :edit-data="selectedRestoration" :key="selectedRestoration ? selectedRestoration.id : 'new'" @close="showRestorationDialog = false" @refresh="fetchRestorationList"></AddRestorationForm>
                </v-dialog>

                <v-row class="w-100 mt-6">
                    <v-col cols="12">
                        <v-card class="rounded-xl elevation-6 pa-6 bg-white">
                            
                            <h2 class="text-h6 font-weight-bold mb-6 text-grey-darken-3 pl-1">
                                Restoration Stages
                            </h2>

                            <v-timeline density="compact" side="end" align="start" truncate-line="both">
                                
                                <v-timeline-item 
                                    v-for="item in restorationList" 
                                    :key="item.id"
                                    :dot-color="item.status === 'completed' ? 'green-accent-4' : 'purple-lighten-4'"
                                    size="small"
                                    fill-dot
                                >

                                    <template v-slot:icon>
                                        <div @click.stop="toggleStageStatus(item.id)" class="d-flex align-center justify-center w-100 h-100" style="cursor: pointer;">
                                            <v-icon
                                                :icon="item.status === 'completed' ? 'mdi-check' : 'mdi:circle-outline'"
                                                size="small"
                                                color="white"
                                            ></v-icon>
                                        </div>
                                    </template>

                                    <v-card 
                                        flat 
                                        class="rounded-lg pa-4 mb-2 w-100"
                                        :class="item.status === 'completed' ? 'bg-green-lighten-5 border-green' : 'bg-purple-lighten-5 border-purple'"
                                        style="border: 1px solid transparent;"
                                    >
                                        <div class="d-flex justify-space-between align-start mb-2">
                                            <v-chip 
                                                size="small" 
                                                :color="item.status === 'completed' ? 'green-lighten-4' : 'purple-lighten-4'" 
                                                variant="flat" 
                                                class="mr-2 font-weight-bold text-purple-darken-2"
                                                :class="item.status === 'completed' ? 'text-green-darken-3' : 'text-purple-darken-2'"
                                                >

                                            <v-icon start :icon="item.status === 'completed' ? 'mdi-check-all' : 'mdi-check-outline'" size="small"></v-icon>
                                                {{ item.status === 'completed' ? 'Finished' : 'Unfinished' }}
                                            </v-chip>

                                            <div>
                                                <v-btn icon variant="text" density="compact" color="teal-darken-1" class="pb-2 mr-3" @click="editRestoration(item)">
                                                    <v-icon icon="mdi-pencil-outline"></v-icon>
                                                </v-btn>

                                                <v-btn icon variant="text" density="compact" color="red-lighten-2" class="pb-2" @click="deleteRestoration(item.id)">
                                                    <v-icon icon="mdi-delete-outline"></v-icon>
                                                </v-btn>
                                            </div>
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
                                                {{ new Date(item.date).toLocaleDateString() }}
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import AddRestorationForm from '@/components/forms/AddRestorationForm.vue';
import AppHeader from '@/components/forms/AppHeader.vue';
import axios from 'axios';

const showRestorationDialog = ref(false);
const router = useRouter();
const restorationList = ref([]);
const selectedRestoration = ref(null);

function goToMaintenancePage() {
    router.push('/maintenance');
}

function goToTunningPage() {
    router.push('/tunning');
}

const fetchRestorationList = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            console.error('An error occured. Please try again!');
            return;
        }

        const response = await axios.get(`http://localhost:5000/server/restoration/${user.id}`);

        if (Array.isArray(response.data)) {
            restorationList.value = response.data;
            restorationList.value.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            console.error('Invalid data format, expected an array!');
            restorationList.value = [];
        }
    } catch (error) {
        console.error('Error when trying to fetch restoration list: ', error.message);
        restorationList.value = [];
    }
};

const deleteRestoration = async(id) => {
    try {
        if(!confirm('Are you sure you want to delete the selected restoration?')) {
            return;
        }

        await axios.delete(`http://localhost:5000/server/restoration/delete/${id}`);
        restorationList.value = restorationList.value.filter(item => item.id !== id);
    } catch (error) {
        console.error('Error when trying to delete restoration: ', error.message);
        alert('Could not delete selected restoration!');  
    }
};

onMounted(() => {
    fetchRestorationList();
})

const totalStages = computed(() => restorationList.value.length);

const completedStages = computed(() => {
    return restorationList.value.filter(stage => stage.status === 'completed').length;
});

const progressPercentage = computed(() => {
    if (totalStages.value === 0) {
        return 0;
    }

    return (completedStages.value / totalStages.value) * 100;
})

async function toggleStageStatus(id) {
    const stage = restorationList.value.find(item => item.id === id);

    if (stage) {
        const newStatus = stage.status === 'completed' ? 'pending' : 'completed';
        stage.status = newStatus;

        if (newStatus === 'completed') {
            stage.date = new Date().toLocaleDateString();
        } else {
            stage.date = null;
        }
    }
};

const openAddDialog = () => {
    selectedRestoration.value = null;
    showRestorationDialog.value = true;
}

const editRestoration = (item) => {
    selectedRestoration.value = item;
    showRestorationDialog.value = true;
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

:deep(.v-timeline-item__body) {
    width: 100%;
    flex: 1;
    padding-right: 0 !important;
}

</style>
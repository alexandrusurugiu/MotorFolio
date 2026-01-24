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
                            <h2 class="text-h5 font-weight-bold text-purple-accent-3">Restoration</h2>
                            <v-progress-linear model-value="100" color="purple-accent-3" height="6" rounded class="mt-4 w-50"></v-progress-linear>
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
                        <v-card class="rounded-xl elevation-6 pa-4 bg-white">
                            <div class="d-flex justify-space-between align-center pl-2 pr-2">
                                <v-card-title class="text-h6 font-weight-bold mb-3 pl-2">
                                    Restoration Stages
                                </v-card-title>

                                <v-btn
                                    color="red-darken-1"
                                    class="mb-3"
                                    variant="tonal"
                                    size="small"
                                    prepend-icon="mdi-file-pdf-box"
                                    @click="generatePDF"
                                    :disabled="restorationList.length === 0"
                                >
                                    Export
                                </v-btn>
                            </div>

                            <div class="d-flex gap-4 mb-6 align-center">
                                <v-text-field
                                    v-model="searchQuery"
                                    prepend-inner-icon="mdi-magnify"
                                    label="Search history"
                                    variant="solo-filled"
                                    flat
                                    hide-details
                                    density="compact"
                                    bg-color="grey-lighten-4"
                                    class="rounded-lg flex-grow-1 mr-2"
                                ></v-text-field>

                                <v-menu location="bottom end" transition="scale-transition">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" color="purple-darken-3" variant="tonal" height="49" class="rounded-lg px-4">
                                            <v-icon :icon="sortDesc ? 'mdi-sort-ascending' : 'mdi-sort-descending'" class="mr-2"></v-icon>
                                            {{ currentSortLabel }}
                                            <v-icon icon="mdi-chevron-down" size="small" class="ml-1"></v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list class="rounded-lg elevation-4 py-2" width="200">
                                        <v-list-subheader class="text-uppercase text-caption font-weight-bold">Sort by</v-list-subheader>
                                    
                                        <v-list-item
                                            v-for="option in sortOptions"
                                            :key="option.value"
                                            :value="option.value"
                                            @click="sortBy = option.value"
                                            :active="sortBy === option.value"
                                            color="purple"
                                            rounded="lg"
                                            class="mb-1 mx-2"
                                        >
                                            <template v-slot:prepend>
                                                <v-icon :icon="option.icon" size="small" class="mr-2"></v-icon>
                                            </template>

                                            <v-list-item-title>{{ option.title }}</v-list-item-title>
                                        
                                            <template v-slot:append v-if="sortBy === option.value">
                                                <v-icon icon="mdi-check" size="small" color="purple"></v-icon>
                                            </template>
                                        </v-list-item>

                                        <v-divider class="my-2"></v-divider>

                                        <v-list-subheader class="text-uppercase text-caption font-weight-bold">Direction</v-list-subheader>
                                    
                                        <v-list-item @click="sortDesc = !sortDesc" class="mx-2 rounded-lg">
                                            <template v-slot:prepend>
                                                <v-icon :icon="sortDesc ? 'mdi-sort-descending' : 'mdi-sort-ascending'"></v-icon>
                                            </template>

                                            <v-list-item-title>{{ sortDesc ? 'Ascending' : 'Descending' }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>

                            <v-timeline density="compact" side="end" align="start" truncate-line="both">
                                
                                <v-timeline-item 
                                    v-for="item in filteredList" 
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
                                            <div class="d-flex align-center mr-6 mb-2">
                                                <v-icon icon="mdi-calendar" size="small" :color="item.status === 'completed' ? 'green' : 'purple'" class="mr-2"></v-icon>
                                                <span  class="text-caption font-weight-medium" :class="item.status === 'completed' ? 'text-green-darken-2' : 'text-purple-darken-2'">{{ new Date(item.date).toLocaleDateString() }}</span>
                                            </div>

                                            <div class="d-flex align-cente mb-2">                                            
                                                <v-icon icon="mdi-cash" size="small" color="green-darken-3" class="mr-2"></v-icon>
                                                <span class="text-caption font-weight-bold text-green-darken-3">{{ item.price }} RON</span>
                                            </div>
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
    import jsPDF from 'jspdf';
    import autoTable from 'jspdf-autotable';

    const showRestorationDialog = ref(false);
    const router = useRouter();
    const restorationList = ref([]);
    const selectedRestoration = ref(null);
    const searchQuery = ref('');
    const sortBy = ref('date');
    const sortDesc = ref(true);
    const sortOptions = [
        { title: 'Date', value: 'date', icon: 'mdi-calendar' },
        { title: 'Price', value: 'price', icon: 'mdi-cash' },
        { title: 'Status', value: 'status', icon: 'mdi-check'}
    ];

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

            const response = await axios.get('/server/restoration');

            if (Array.isArray(response.data)) {
                restorationList.value = response.data.map(item => ({
                    ...item,
                    originalDate: item.date
                }));
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

            await axios.delete(`/server/restoration/delete/${id}`);
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
                stage.date = stage.originalDate;
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

    const totalCost = computed(() => {
        return restorationList.value.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
    });

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('Restoration history', pageWidth / 2, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.text(`(${new Date().toLocaleDateString()})`, pageWidth / 2, 25, { align: 'center' });

        const tableData = restorationList.value.map(item => [
            new Date(item.date).toLocaleDateString(),
            item.title,
            `${item.price} RON`,
            item.description || '-',
            item.status
        ]);

        autoTable(doc, {
            head: [['Date', 'Restoration Title', 'Cost', 'Notes', 'Status']],
            body: tableData,
            startY: 40,
            theme: 'grid',
            headStyles: { fillColor: [213, 0, 249] },
            styles: { fontSize: 10, cellPadding: 3 }
        });

        const finalY = doc.lastAutoTable.finalY || 40;
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Total investment: ${totalCost.value} RON`, 14, finalY + 10);
        doc.save('restoration_report.pdf');
    }

    const filteredList = computed(() => {
        let result = restorationList.value;

        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            result = result.filter(item => item.title.toLowerCase().includes(query) || (item.description && item.description.toLowerCase().includes(query)));
        }

        return result.sort((a, b) => {
            let comp = 0;
            const modifier = sortDesc.value ? -1 : 1;

            switch (sortBy.value) {
                case 'date':
                    comp = new Date(a.date) - new Date(b.date);
                    break;
                case 'price':
                    comp = Number(a.price) - Number(b.price);
                    break;
                case 'status':
                    const statusA = a.status || '';
                    const statusB = b.status || '';
                    comp = statusA.localeCompare(statusB);
                    break;
                default:
                    comp = 0;
            }

            if (comp === 0) {
                return new Date(b.date) - new Date(a.date);
            }

            return comp * modifier;
        });
    });

    const currentSortLabel = computed(() => {
        const option = sortOptions.find(option => option.value === sortBy.value);
        return option ? option.title : 'Sort';
    })
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
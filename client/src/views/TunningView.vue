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
                                <div class="text-h4 font-weight-bold">{{ totalMods }}</div>
                            </div>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-card class="pa-6 rounded-xl elevation-4 d-flex align-center">
                            <v-icon icon="mdi-cash" color="green" size="40" class="mr-4"></v-icon>
                            <div>
                                <div class="text-subtitle-1">Investment</div>
                                <div class="text-h4 font-weight-bold">{{ totalInvestment }} RON</div>
                            </div>
                        </v-card>
                    </v-col>
                    
                    <v-col cols="12" md="4">
                        <v-card class="pa-6 rounded-xl elevation-4 mb-4">
                            <div class="d-flex align-center">
                                <v-icon icon="mdi-speedometer" color="black" size="40" class="mr-4"></v-icon>
                                <div>
                                    <div class="text-subtitle-1">Horsepower gain</div>
                                    <div class="text-h4 font-weight-bold">+{{ totalPowerGain }} HP</div>
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
                                @click="openAddDialog"
                            >
                                Add modd
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

                <v-dialog v-model="showTunningDialog" max-width="600">
                    <AddTunningForm :edit-data="selectedTunning" :key="selectedTunning ? selectedTunning.id : 'new'" @close="showTunningDialog = false" @refresh="fetchTunningList"></AddTunningForm>
                </v-dialog>

                <v-row class="w-100 mt-6">
                    <v-col cols="12">
                        <v-card class="rounded-xl elevation-6 pa-4 bg-white">
                            <div class="d-flex justify-space-between align-center pl-2 pr-2">
                                <v-card-title class="text-h6 font-weight-bold mb-3 pl-2">
                                    Tunning History
                                </v-card-title>

                                <v-btn
                                    color="red-darken-1"
                                    class="mb-3"
                                    variant="tonal"
                                    size="small"
                                    prepend-icon="mdi-file-pdf-box"
                                    @click="generatePDF"
                                    :disabled="totalMods === 0"
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
                                        <v-btn v-bind="props" color="orange-darken-3" variant="tonal" height="48" class="rounded-lg px-4">
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
                                            color="orange"
                                            rounded="lg"
                                            class="mb-1 mx-2"
                                        >
                                        
                                            <template v-slot:prepend>
                                                <v-icon :icon="option.icon" size="small" class="mr-2"></v-icon>
                                            </template>

                                            <v-list-item-title>{{ option.title }}</v-list-item-title>

                                            <template v-slot:append v-if="sortBy === option.value">
                                                <v-icon icon="mdi-check" size="small" color="orange"></v-icon>
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

                            <div v-if="totalMods === 0" class="text-center py-4 text-grey">There is no record of tunning yet.</div>

                            <v-card v-else v-for="item in filteredList" :key="item.id" flat class="bg-orange-lighten-5 rounded-xl pa-5 mb-4 mod-item border-orange-thin">
                                
                                <div class="d-flex justify-space-between align-start mb-2">
                                    <v-chip color="orange-accent-3" class="mb-3 font-weight-bold px-4" size="small" label>
                                        <v-icon start :icon="getCategoryIcon(item.category)" size="small"></v-icon>
                                        {{ item.category }}
                                    </v-chip>

                                    <div>
                                        <v-btn icon variant="text" density="compact" color="teal-darken-1" class="pb-2 mr-3" @click="editTunning(item)">
                                            <v-icon icon="mdi-pencil-outline"></v-icon>
                                        </v-btn>

                                        <v-btn icon variant="text" density="compact" color="red-lighten-2" class="pb-2" @click="deleteTunning(item.id)">
                                            <v-icon icon="mdi-delete-outline"></v-icon>
                                        </v-btn>
                                    </div>
                                    
                                </div>

                                <h3 class="text-h6 font-weight-bold text-orange-darken-4 mb-1">{{ item.title }}</h3>

                                <p class="text-body-2 text-orange-darken-3 mb-4 opacity-90">{{ item.description }}</p>
                                
                                <div class="d-flex flex-wrap align-center">
                                    <div class="d-flex align-center mr-6 mb-2">
                                        <v-icon icon="mdi-calendar" size="small" color="orange-darken-2" class="mr-2"></v-icon>
                                        <span class="text-caption text-orange-darken-4 font-weight-medium">{{ parseDate(item.date).toLocaleDateString() }}</span>
                                    </div>
                                    <div class="d-flex align-center mr-6 mb-2">
                                        <v-icon icon="mdi-cash" size="small" color="green-darken-2" class="mr-2"></v-icon>
                                        <span class="text-caption text-green-darken-3 font-weight-bold">{{ item.price }} RON</span>
                                    </div>
                                    <div class="d-flex align-center mb-2">
                                        <v-icon icon="mdi-flash" size="small" color="black" class="mr-2"></v-icon>
                                        <span class="text-caption text-black font-weight-bold">+{{ item.powerGained }} HP</span>
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
    import { ref, onMounted, computed } from 'vue';
    import AddTunningForm from '@/components/forms/AddTunningForm.vue';
    import { useRouter } from 'vue-router';
    import AppHeader from '@/components/forms/AppHeader.vue';
    import jsPDF from 'jspdf';
    import autoTable from 'jspdf-autotable';
    import { useTunningStore } from '@/stores/tunning';

    const showTunningDialog = ref(false);
    const router = useRouter();
    const tunningStore = useTunningStore();
    const selectedTunning = ref(null);
    const searchQuery = ref('');
    const sortBy = ref('date');
    const sortDesc = ref(true);
    const sortOptions = [
        { title: 'Date', value: 'date', icon: 'mdi-calendar' },
        { title: 'Price', value: 'price', icon: 'mdi-cash' },
        { title: 'PowerGained', value: 'powerGained', icon: 'mdi-flash' }
    ];
    const categoryIcons = {
        'Engine': 'mdi-engine',
        'Suspension': 'mdi-arrow-expand-vertical',
        'Exhaust': 'mdi-weather-windy',
        'Wheels': 'mdi-tire',
        'Exterior': 'mdi-car-wash',
        'Interior': 'mdi-car-seat'
    };

    function goToMaintenancePage() {
    router.push('/maintenance');
    }

    function goToRestorationPage() {
        router.push('/restoration');
    }

    const fetchTunningList = async () => {
        await tunningStore.fetchAllItems(true);
    };

    const deleteTunning = async(id) => {
        if (!confirm('Are you sure you want to delete the selected tunning?')) {
            return;
        }
        
        try {
            await tunningStore.deleteTunning(id);
        } catch (error) {
            console.error('Error when trying to delete tunning: ', error.message);
            alert('Could not delete selected tunning!');
        }
    }

    onMounted(() => {
        tunningStore.fetchAllItems();
    });

    const totalInvestment = computed(() => {
        const value = Number(tunningStore.totalInvestment) || 0;
        return new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2,  maximumFractionDigits: 2 }).format(value);
    });
    const totalPowerGain = computed(() => tunningStore.totalPowerGain);
    const totalMods = computed(() => tunningStore.totalMods);

    const getCategoryIcon = (category) => categoryIcons[category];

    const openAddDialog = () => {
        selectedTunning.value = null;
        showTunningDialog.value = true;
    }

    const editTunning = (item) => {
        selectedTunning.value = item;
        showTunningDialog.value = true;
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('Tunning history', pageWidth / 2, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.text(`(${new Date().toLocaleDateString()})`, pageWidth / 2, 25, { align: 'center' });

        const tableData = tunningStore.items.map(item => [
            parseDate(item.date).toLocaleDateString(),
            item.title,
            `${item.price} RON`,
            item.category,
            `+${item.powerGained} HP`,
            item.description || '-'
        ]);

        autoTable(doc, {
            head: [['Date', 'Mod Title', 'Price', 'Category', 'Power Gained', 'Notes']],
            body: tableData,
            startY: 40,
            theme: 'grid',
            headStyles: { fillColor: [251, 140, 0] },
            styles: { fontSize: 10, cellPadding: 3 }
        });

        const finalY = doc.lastAutoTable.finalY || 40;
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Total investment: ${totalInvestment.value} RON`, 14, finalY + 10);
        doc.save('tunning_report.pdf');
    }

    const filteredList = computed(() => {
        let result = tunningStore.items;

        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            result = result.filter(item => item.title.toLowerCase().includes(query) || (item.description && item.description.toLowerCase().includes(query)));
        }

        return [...result].sort((a, b) => {
            let comp = 0;
            const modifier = sortDesc.value ? -1 : 1;

            switch(sortBy.value) {
                case 'date':
                    comp = parseDate(a.date) - parseDate(b.date);
                    break;
                case 'price':
                    comp = Number(a.price) - Number(b.price);
                    break;
                case 'powerGained':
                    comp = Number(a.powerGained) - Number(b.powerGained);
                    break;
                default:
                    comp = 0;
            }

            if (comp === 0) {
                if (sortBy.value === 'date') {
                    return 0;
                }

                return parseDate(b.date) - parseDate(a.date);
            }

            return comp * modifier;
        });
    });

    const currentSortLabel = computed(() => {
        const option = sortOptions.find(option => option.value === sortBy.value);
        return option ? option.title : 'Sort';
    });

    const parseDate = (dateVal) => {
        if (!dateVal) {
            return new Date();
        }

        if (typeof dateVal === 'object' && dateVal._seconds) {
            return new Date(dateVal._seconds * 1000);
        }

        return new Date(dateVal);
    };
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
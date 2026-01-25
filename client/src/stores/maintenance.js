import { defineStore } from 'pinia';
import axios from 'axios';

export const useMaintenanceStore = defineStore('maintenance', {
    state: () => ({
        items: [],
        isLoaded: false
    }),
    getters: {
        totalCost: (state) => {
            return state.items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
        },

        totalCount: (state) => state.items.length
    },
    actions: {
        async fetchAllItems(forceRefresh = false) {
            if (this.isLoaded && !forceRefresh) {
                return;
            }

            try {
                const response = await axios.get('/server/maintenance');

                if (Array.isArray(response.data)) {
                    this.items = response.data;
                    this.items.sort((a, b) => new Date(b.date) - new Date(a.date));
                    this.isLoaded = true;
                }
            } catch (error) {
                console.error('Failed to fetch maintenance items from store: ', error);
            }
        },

        async addMaintenance(payload) {
            try {
                const response = await axios.post('/server/maintenance/add-maintenance', payload);
                this.items.push({ id: response.data.id, ...payload });
                this.items.sort((a, b) => new Date(b.date) - new Date(a.date));
            } catch (error) {
                console.error('Failed to add maintenance item to store: ', error);
            }
        },

        async deleteMaintenance(id) {
            try {
                await axios.delete(`/server/maintenance/delete/${id}`);
                this.items = this.items.filter(item => item.id !== id);
            } catch (error) {
                console.error('Failed to delete maintenance item from store: ', error);
            }
        },

        async updateMaintenance(id, payload) {
            try {
                await axios.put(`/server/maintenance/update/${id}`, payload);
                const index = this.items.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.items[index] = { ...this.items[index], ...payload };
                }
            } catch (error) {
                console.error('Failed to update maintenance item from store: ', error);
            }
        }
    }
});
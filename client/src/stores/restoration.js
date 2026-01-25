import { defineStore } from 'pinia';
import axios from 'axios';

export const useRestorationStore = defineStore('restoration', {
    state: () => ({
        items: [],
        isLoaded: false
    }),
    getters: {
        totalCost: (state) => state.items.reduce((acc, item) => acc + (Number(item.price) || 0), 0),
        totalStages: (state) => state.items.length,
        completedStages: (state) => state.items.filter(item => item.status === 'completed').length,
        progressPercentage: (state) => {
            if (state.items.length === 0) {
                return 0;
            }

            const completed = state.items.filter(item => item.status === 'completed').length;
            return (completed / state.items.length) * 100;
        }
    },
    actions: {
        async fetchAllItems(forceRefresh = false) {
            if (this.isLoaded && !forceRefresh) {
                return;
            }

            try {
                const response = await axios.get('/server/restoration');

                if (Array.isArray(response.data)) {
                    this.items = response.data.map(item => ({
                        ...item,
                        originalDate: item.date
                    }));
                    this.items.sort((a, b) => new Date(b.date) - new Date(a.date));
                    this.isLoaded = true;
                }
            } catch (error) {
                console.error('Failed to fetch restoration items from store: ', error);
            }
        },

        async addRestoration(payload) {
            try {
                const response = await axios.post('/server/restoration/add-restoration', payload);
                const newItem = { id: response.data.id, ...payload, originalDate: payload.date };
                this.items.push(newItem);
                this.items.sort((a, b) => new Date(b.date) - new Date(a.date));
            } catch (error) {
                console.error('Failed to add restoration item to store: ', error);
            }
        },

        async deleteRestoration(id) {
            try {
                await axios.delete(`/server/restoration/delete/${id}`);
                this.items = this.items.filter(item => item.id !== id);
            } catch (error) {
                console.error('Failed to delete restoration item from store: ', error);
            }
        },

        async updateRestoration(id, payload) {
            try {
                await axios.put(`/server/restoration/update/${id}`, payload);
                const index = this.items.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.items[index] = { ...this.items[index], ...payload };
                }
            } catch (error) {
                console.error('Failed to update restoration item from store: ', error);
            }
        },

        toggleStageStatus(id) {
            const stage = this.items.find(item => item.id === id);

            if (stage) {
                const newStatus = stage.status === 'completed' ? 'pending' : 'completed';
                stage.status = newStatus;

                if(newStatus === 'completed') {
                    stage.completionDate = new Date().toISOString();
                } else {
                    stage.date = stage.originalDate;
                }
            }
        }
    }
});
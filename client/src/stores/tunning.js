import { defineStore } from 'pinia';
import axios from 'axios';

export const useTunningStore = defineStore('tunning', {
    state: () => ({
        items: [],
        isLoaded: false
    }),
    getters: {
        totalInvestment: (state) => state.items.reduce((acc, item) => acc + (Number(item.price) || 0), 0),
        totalPowerGain: (state) => state.items.reduce((acc, item) => acc + (Number(item.powerGained) || 0), 0 ),
        totalMods: (state) => state.items.length
    },
    actions: {
        async fetchAllItems(forceRefresh = false) {
            if (this.isLoaded && !forceRefresh) {
                return;
            }

            try {
                const response = await axios.get('/server/tunning');
                
                if(Array.isArray(response.data)) {
                    this.items = response.data;
                    this.items.sort((a, b) => new Date(b.date) - new Date(a.date));
                    this.isLoaded = true;
                } 
            } catch (error) {
                console.error('Failed to fetch tunning items from store: ', error);
            }
        },

        async addTunning(payload) {
            try {
                const response = await axios.post('/server/tunning/add-tunning', payload);
                this.items.push({ id: response.data.id, ...payload });
                this.items.sort((a, b) => new Date(b.date) - new Date(a.date));
            } catch (error) {
                console.error('Failed to add tunning item to store: ', error);
            }
        },

        async deleteTunning(id) {
            try {
                await axios.delete(`/server/tunning/delete/${id}`);
                this.items = this.items.filter(item => item.id !== id);
            } catch (error) {
                console.error('Failed to delete tunning item from store: ', error);
            }
        },

        async updateTunning(id, payload) {
            try {
                await axios.put(`/server/tunning/update/${id}`, payload);
                const index = this.items.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.items[index] = { ...this.items[index], ...payload };
                }
            } catch (error) {
                console.error('Failed to update tunning item from store: ', error);
            }
        }
    }
});
import {defineStore} from 'pinia'
import {API} from "../services/api";

// @ts-ignore
export const useCompanyStore = defineStore('company', {
    state: () => ({
        id: null,
        name: null,
        settings: <any>[],
        companies: <any>[],
        companyOptions: <any>[],
        companiesSelect: null
    }),
    getters: {
        getId: (state) => state.id,
        getName: (state) => state.name,
        getSettings: (state) => state.settings,
        getCompanies: state => state.companies,
        getCompanyOptions: state => state.companyOptions,
        getCompaniesSelect: state => state.companiesSelect
    },
    actions: {
        async setAllCompanies(page = 1) {
            const api = new API();
            try {
                const response = await api.get(`/sass/v1/companies?page=${page}&take=20`);
                response.data?.map((company: any) => {
                    this.setCompanies(company)
                })
                if (response.meta.page.currentPage < response.meta.page.lastPage) {
                    this.setAllCompanies(response.meta.page.currentPage + 1);
                }
            } catch (error) {
                console.error('Error fetching companies on page ' + page + ':', error);
                return [];  // Devuelve un array vacío o maneja el error según tu lógica
            }
        },
        setCompaniesSelect(payload: any) {
            if (payload) this.companiesSelect = payload
        },
        setCompany(payload: any) {
            if (payload.id) this.id = payload.id
            if (payload.name) this.name = payload.name
            if (payload.settings) {
                const {sync_driver, sync_time, sync_tracking, user_api_devices, last_sync} = payload.settings;
                this.settings = {sync_driver, sync_time, sync_tracking, user_api_devices, last_sync};
            }
        },
        setCompanyOptions(payload: []) {
            if (payload.length) {
                this.companyOptions = payload.map(function (x: any) {
                    return {
                        label: x.name,
                        value: x.id
                    }
                })
            }
        },
        setCompanies(payload) {
            if (payload) this.companies.push(payload)
        },
        clearCompany() {
            this.id = null
            this.name = null
            this.settings = []
        },
        clearCompanies() {
            this.companies = []
            this.companyOptions = []
            this.companiesSelect = []
        }
    },
    persist: true,
})

import {defineStore} from 'pinia'
import {API} from "../services/api";

// @ts-ignore
export const useCompanyStore = defineStore('company', {
    state: () => ({
        id: null,
        name: null,
        companies: <any>[],
        companyOptions: <any>[],
        companiesSelect: null
    }),
    getters: {
        getId: (state) => state.id,
        getName: (state) => state.name,
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
        },
        clearCompanies() {
            this.companies = []
            this.companyOptions = []
            this.companiesSelect = []
        }
    },
    persist: true,
})

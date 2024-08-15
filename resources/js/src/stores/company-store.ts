import { defineStore } from 'pinia'
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
    setCompaniesSelect (payload: any) {
        if (payload) this.companiesSelect = payload
    },
    setCompany (payload: any) {
      if (payload.id) this.id = payload.id
      if (payload.name) this.name = payload.name
    },
    setCompanyOptions (payload: []) {
      if (payload.length) {
        this.companyOptions = payload.map(function (x: any) {
          return {
            label: x.name,
            value: x.id
          }
        })
      }
    },
    setCompanies (payload: []) {
      if (payload.length) this.companies = payload
    },
    clearCompany () {
      this.id = null
      this.name = null
    },
    clearCompanies () {
      this.companies = []
      this.companyOptions = []
      this.companiesSelect = []
    }
  },
  persist: true
})

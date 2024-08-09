import { defineStore } from 'pinia'
export const useCompanyStore = defineStore('company', {
  state: () => ({
    id: null,
    name: null,
    settings: <any>[],
    companies: <any>[],
    companyOptions: <any>[]
  }),
  getters: {
    getId: (state) => state.id,
    getName: (state) => state.name,
    getSettings: (state) => state.settings,
    getCompanies: state => state.companies,
    getCompanyOptions: state => state.companyOptions
  },
  actions: {
    setCompany (payload: any) {
      if (payload.id) this.id = payload.id
      if (payload.name) this.name = payload.name
      if (payload.settings) this.settings = payload.settings
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
      this.settings = []
    },
    clearCompanies () {
      this.companies = []
      this.companyOptions = []
    }
  },
  persist: true
})

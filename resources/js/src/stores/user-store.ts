import {defineStore} from 'pinia';
import axios from 'axios';
import {useCompanyStore} from './company-store';
import {API} from "../services/api";

// @ts-ignore
export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        first_name: null,
        last_name: null,
        full_name: null,
        email: null,
        avatar: null,
        is_activated: null,
        permissions: <any>{},
        last_login: null,
        roles: [],
        api_token: null
    }),
    getters: {
        getId: (state) => state.id,
        getFirstName: (state) => state.first_name,
        getLastName: (state) => state.last_name,
        getFullName: (state) => state.full_name,
        getEmail: (state) => state.email,
        getAvatar: (state) => state.avatar,
        getIsActivated: (state) => state.is_activated,
        getPermissions: (state) => state.permissions,
        getLastLogin: (state) => state.last_login,
        getRoles: (state) => state.roles,
        getToken: (state) => state.api_token,
    },
    actions: {
        async login(email: any, password: any) {
            try {
                const companyStore = useCompanyStore();
                await axios.post('https://apps.ejesatelital.com/api/auth/login', {
                        email: email.value,
                        password: password.value
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                ).then(async response => {
                    const user = response.data;
                    await this.setUser(user);
                    if (this.hasAccess('sass.companies.indexall')) {
                        let limit = 20
                        let page = 1;
                        let lastPage = 1;
                        try {
                          do {
                            // Llamar a setAllCompanies para obtener los datos de la página actual
                            const response = await companyStore.setAllCompanies(limit, page);
                            // Añadir los nuevos datos al array de companies
                            response.data.forEach((company: any) => {
                              companyStore.companies.push(company);
                            });
                            // Actualizar el número de la página actual y de la última página
                            page = response.meta.page.currentPage + 1;
                            lastPage = response.meta.page.lastPage;
                          } while (page <= lastPage); // Continuar mientras no se haya alcanzado la última página

                        } catch (error) {
                          console.error('Error fetching companies:', error);
                        }
                        companyStore.setCompany(companyStore.companies[0]);
                        companyStore.setCompaniesSelect([companyStore.companies[0].id]);
                        companyStore.setCompanyOptions(companyStore.companies);
                    } else {
                        if (user.companies.length === 1) {
                            companyStore.setCompany(user.companies[0]);
                            companyStore.setCompaniesSelect([user.companies[0].id]);
                        }
                        companyStore.setCompanies(user.companies);
                        companyStore.setCompanyOptions(user.companies);
                    }
                })
            } catch (e) {
                if (e) {
                    throw e
                }
            }
        },
        async loginToken(token: any) {
            try {
                const companyStore = useCompanyStore();
                await axios.post('https://apps.ejesatelital.com/api/auth/login-token', {
                        token: token
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                ).then(response => {
                    const user = response.data.data;
                    this.setUser(user);
                    if (user.companies.length === 1) {
                        companyStore.setCompany(user.companies[0]);
                        companyStore.setCompaniesSelect(user.companies[0].value);
                    }

                    companyStore.setCompanies(user.companies);
                    companyStore.setCompanyOptions(user.companies);
                })
            } catch (e) {
                if (e) {
                    throw e
                }
            }
        },
        async logout() {
            try {
                const api = new API()
                await api.get("/auth/logout");
                const companyStore = useCompanyStore();
                this.clearUser();
                await companyStore.clearCompanies();
                await companyStore.clearCompany();
            } catch (e) {
                if (e) throw e
            }
        },
        setUser(payload: any) {
            if (payload.id) this.id = payload.id
            if (payload.first_name) this.first_name = payload.first_name
            if (payload.last_name) this.last_name = payload.last_name
            if (payload.full_name) this.full_name = payload.full_name
            if (payload.email) this.email = payload.email
            if (payload.avatar) this.avatar = payload.avatar
            if (payload.is_activated) this.is_activated = payload.is_activated
            if (payload.permissions) this.permissions = payload.permissions
            if (payload.last_login) this.last_login = payload.last_login
            if (payload.roles) this.roles = payload.roles
            if (payload.api_token) this.api_token = payload.api_token
        },
        clearUser() {
            this.id = null
            this.first_name = null
            this.last_name = null
            this.full_name = null
            this.email = null
            this.avatar = null
            this.is_activated = null
            this.permissions = null
            this.last_login = null
            this.roles = []
            this.api_token = null
        },
        hasAccess(payload) {
            return this.permissions.hasOwnProperty(payload)
        }
    },
    persist: true
})

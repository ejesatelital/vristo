import {defineStore} from 'pinia'
import {API} from "../services/local";

// @ts-ignore
export const useSubscriptionsStore = defineStore('subscriptions', {
    state: () => ({
        subscriptions: <any>[]
    }),
    getters: {
        getSubscriptions: (state) => state.subscriptions,
    },
    actions: {
        async setMySubscriptions(company_id , status = 1) {
            // console.log(company_id);

            const api = new API();
            let subscriptions: any = []
            await api.get(`subscriptions/v1/subscriptions?filter={"company_id":${company_id}, "status":${status}}`).then(async function (response) {
                subscriptions = response?.data
            }).catch(e => {
                console.log(e)
            });
            // console.log(subscriptions);

            return subscriptions
        },
        setSubscriptions(payload: []) {
            if (payload.length) this.subscriptions = payload
        },
        clearSubscriptions() {
            this.subscriptions = []
        }
    },
    persist: true
})

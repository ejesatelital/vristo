import { ref } from 'vue';
import axios from 'axios';

const device = ref([]);

export const getCompanies = async () => {
    try {
        const response = await axios.get(`/companies/settings`, {
            headers: {
                'Authorization': `Bearer b648f0b9-419f-4bbb-b5fd-cd72a6e57c10`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data.data);

        if (Array.isArray(response.data.data)) {
            device.value = response.data.data;
        } else {
            console.error('Error: Response data is not an array');
        }
    } catch (error) {
        console.error('Error fetching data', error);
    }
}

export default {
    getCompanies
};

import axios, {AxiosInstance} from 'axios';
import {useUserStore} from "../stores/user-store";

const baseURL = 'https://apps.ejesatelital.com/api/'; // Reemplaza con la URL de tu API

export class API {
    private instance: AxiosInstance;
    private instanceForm: AxiosInstance;
    constructor() {
        const userStore = useUserStore()
        if (userStore.api_token) {
            this.instance = axios.create({
                baseURL,
                headers: {
                    Authorization: `Bearer ${userStore.api_token}`
                },
            });
            this.instanceForm = axios.create({
                baseURL,
                headers: {
                    Authorization: `Bearer ${userStore.api_token}`,
                    "Content-Type": "multipart/form-data"
                },
            });
        }
    }

    async get(url: string): Promise<any> {
        const userStore = useUserStore();
        try {
            const response = await this.instance.get(url);
            return response.data;
        } catch (error) {
            if (error.response) {
                // Manejar el error según el código de estado
                if (error.response.status === 401) {
                    userStore.logout();
                } else if (error.response.status === 500) {
                    // Mostrar un mensaje de error genérico
                }
            } else {
                console.error('Error:', error.message);
                // Manejar errores de red o de la aplicación
            }

            // Opcional: Lanzar un error personalizado para su posterior tratamiento
            throw new Error('Error al obtener datos');
        }
    }

    post(url: string, data?: any) {
        return this.instance.post(url, data);
    }

    put(url: string, data?: any) {
        return this.instance.put(url, data);
    }
    postForm(url: string, data?: any) {
        return this.instanceForm.post(url, data);
    }

    putForm(url: string, data?: any) {
        return this.instanceForm.put(url, data);
    }
    delete(url: string) {
        return this.instance.delete(url);
    }
}

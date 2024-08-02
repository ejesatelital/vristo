import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://apps.ejesatelital.com/api/'; // Reemplaza con la URL de tu API

export class API {
    private instance: AxiosInstance;

    constructor() {
        const tokenElement = document.querySelector('meta[name="user-api-token"]');
        if (tokenElement) {
            const token = tokenElement.getAttribute('content');
            if (token) {
                this.instance = axios.create({
                    baseURL,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                console.error('No se encontró el token de autenticación en la etiqueta meta');
            }
        } else {
            console.error('No se encontró la etiqueta meta "user-api-token"');
        }
    }

    async get(url: string): Promise<any> {
        try {
            const response = await this.instance.get(url);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data);
                // Manejar el error según el código de estado
                if (error.response.status === 401) {
                    // Redirigir a la página de login
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
    delete(url: string) {
        return this.instance.delete(url);
    }
}

import { Alert } from 'react-native';

const BASE_URL = 'https://api-clash-backend.onrender.com/api';

export abstract class ApiService {
  private async request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: any): Promise<T> {
    try {
      const url = `${BASE_URL}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      Alert.alert('Error', 'Ocurrió un error al comunicarse con el servidor');
      throw error;
    }
  }

  protected get<T>(endpoint: string): Promise<T> {
    return this.request<T>('GET', endpoint);
  }

  protected post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>('POST', endpoint, data);
  }

  protected put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>('PUT', endpoint, data);
  }

  protected delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint);
  }
}
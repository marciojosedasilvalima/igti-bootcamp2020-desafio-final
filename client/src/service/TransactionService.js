import axios from 'axios';

export const findAll = async (period) => {
    try {
        const baseUrl = 'http://localhost:3001/api/transaction';

        const parameter = period ? `?period=${period}` : '';

        const url = baseUrl + parameter;

        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        return error;
    }
};

export const create = async (lancamento) => {
    try {
        const url = 'http://localhost:3001/api/transaction';

        const response = await axios.post(url, lancamento);

        return response.data;
    } catch (error) {
        return error;
    }
};

export const update = async (id, updateObject) => {
    try {
        const url = 'http://localhost:3001/api/transaction/' + id;

        const response = await axios.put(url, updateObject);

        return response.data;
    } catch (error) {
        return error;
    }
};

export const remove = async (id) => {
    try {
        const url = 'http://localhost:3001/api/transaction/' + id;

        const response = await axios.delete(url);

        return response.data;
    } catch (error) {
        return error;
    }
};

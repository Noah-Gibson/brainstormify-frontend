import axios from 'axios';
import { Document, Brainstorm } from "./models/Document";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const handleError = (action: string, error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error(`Error ${action}: `, error.response?.data);
    } else {
        console.error(`Unknown error ${action}: `, error);
    }
};

export const createDocument = async (document: Partial<Document>): Promise<Document> => {
    try {
        const response = await api.post(`/api/documents`, document);
        return response.data;
    } catch (error) {
        handleError('creating document', error)
        throw error;
    }
};

export const getDocuments = async (): Promise<Document[]> => {
    try {
        const response = await api.get<Document[]>(`/api/documents`);
        return response.data;
    } catch (error) {
        handleError('fetching documents', error)
        throw error;
    }
}

export const getDocument = async (id: string): Promise<Document> => {
    try {
        const response = await api.get<Document>(`/api/documents/${id}`);
        return response.data;
    } catch (error) {
        handleError('fetching document', error)
        throw error;
    }
};

export const updateDocument = async (id: string, data: Partial<Document>): Promise<string> => {
    try {
        console.log("Updating: ", id, data);
        const response = await api.patch(`/api/documents/${id}`, data);
        return response.data;
    } catch (error) {
        handleError('updating document', error)
        throw error;
    }
};

export const deleteDocument = async (id: string) => {
    try {
        const response = await api.delete(`/api/documents/${id}`);
        return response.data;
    } catch (error) {
        handleError("deleting document", error)
        throw error;
    }
};

export const getBrainstorm = async (documentId: number, brainstormId: number) => {
    try {
        const response = await api.get(`/api/documents/${documentId}/brainstorms/${brainstormId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Problem fetching brainstorm: ', error.response?.data);
        } else {
            console.error('Unexpected error occurred: ', error);
        }
        throw error;
    }
};

export const getBrainstorms = async (documentId: string) => {
    try {
        const response = await api.get(`/api/documents/${documentId}/brainstorms`);
        return response.data;
    } catch (error) {
        handleError("getting brainstorms", error)
        throw error;
    }
}

export const createBrainstorm = async (documentId: string, brainstormData: Brainstorm) => {
    try {
        console.log("Sending brainstorm data: ", brainstormData);
        const response = await api.post(`/api/documents/${documentId}/brainstorms`, brainstormData);
        return response.data;
    } catch (error) {
        handleError("creating brainstorm", error);
        throw error;
    }
};

export const deleteBrainstorm = async (brainstormId: number) => {
    try {
        const response = await api.delete(`/delete-brainstorm/${brainstormId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Problem deleting brainstorm: ", error.response?.data);
        } else {
            console.error("Unknown error occurred: ", error);
        }
        throw error;
    }
};
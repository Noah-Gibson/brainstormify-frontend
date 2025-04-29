export interface Author {
    name: string;
    email: string;
}

export interface Brainstorm {
    id?: number;
    content: string;
    author: string;
    created_at: string;
}

export interface Document {
    id?: string;
    title: string;
    author?: string;
    contributors?: string[]; // Optional, defaults to an empty array
    created_at: string;
    last_updated: string;
    //brainstorms?: Brainstorm[];
}

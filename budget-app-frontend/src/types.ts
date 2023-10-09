export interface userGet {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface userPost {
    name: string;
}

export interface categories {
    id: number;
    name: string;
    is_main: boolean;
    order: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface expenses {
    id: number;
    is_cashin: boolean;
    amount: number;
    date: string;
    description: string;
    category_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}
export interface IAuthorizationScope {
    created_at: string;
    id: number;
    status: number;
    title: string;
    updated_at: string;
    urls: string;

    // View properties
    checked?: boolean;
}

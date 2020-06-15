export interface Page {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number
}

export interface Pagination {
    page: Page;
    content: any[];
}

export const isLastPage = (pagination: Pagination): boolean => {
    return pagination.page.number >= pagination.page.totalPages || pagination.content.length === 0
};

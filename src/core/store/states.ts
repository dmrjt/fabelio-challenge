export interface UiState {
    loading?: boolean;
    error?: boolean;
    errorMessages?: string;
}

export const INIT_UI_STATE = {
    loading: false,
    error: false,
    errorMessages: ''
};

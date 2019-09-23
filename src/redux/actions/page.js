export const SHOW_SIGN_IN_DIALOGUE = 'SHOW_SIGN_IN_DIALOGUE';
export const HIDE_SIGN_IN_DIALOGUE = 'HIDE_SIGN_IN_DIALOGUE';
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export function showSignInDialogue() {
    return {
        type: SHOW_SIGN_IN_DIALOGUE,
    }
}
export function hideSignInDialogue() {
    return {
        type: HIDE_SIGN_IN_DIALOGUE,
    }
}
export function showLoading() {
    return {
        type: SHOW_LOADING,
    }
}
export function hideLoading() {
    return {
        type: HIDE_LOADING,
    }
}

export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES';

export function addCompanies(companies) {
    return {
        type: RECEIVE_COMPANIES,
        companies
    }
}

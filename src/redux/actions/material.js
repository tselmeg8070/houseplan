export const RECEIVE_MATERIALS = 'RECEIVE_MATERIALS';

export function addMaterials(materials) {
    return {
        type: RECEIVE_MATERIALS,
        materials
    }
}
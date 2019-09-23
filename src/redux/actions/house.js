export const RECEIVE_PLANS = 'RECEIVE_PLANS';

export function addPlans(plans) {
    return {
        type: RECEIVE_PLANS,
        plans
    }
}

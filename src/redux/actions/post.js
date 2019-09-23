export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function addPosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}
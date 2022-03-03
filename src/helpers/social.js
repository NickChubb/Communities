const BASE_URL = `/api/social`;

/**
 * Get posts from the database
 * @param {*} userId 
 * @param {*} params 
 * @returns 
 */
export const getPosts = async ( userId, params ) => {

    const { count = 15, communityId } = params || {};
    let url = `${BASE_URL}`

    if (communityId) {
        url = url += `/community`;
    }

    const res = await fetch(`${url}/post?` + new URLSearchParams({
        count: count,
        communityId: communityId
    }), {
        method: 'GET',
    })

    return await res.json();
}

// Create new post
export const createPost = async ( userId, communityId, post ) => {

    let res = await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        body: JSON.stringify({
            post: post,
            userId: userId,
            communityId: communityId
        })
    });

    return res;
}

const socialRequest = () => {

}
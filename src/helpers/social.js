
const BASE_URL = `/api/social`;

// Gets posts from community if user is in community.
export const getPosts = async ( userId, count=15 ) => {
    
    const res = await fetch(`${BASE_URL}/post`, {
        method: 'GET'
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
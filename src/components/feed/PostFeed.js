import React from 'react'
import PostCard from './PostCard';

const PostFeed = ({ feed }) => {

    return (
        feed && feed.length > 0?

            feed.map((post, key) => (
                <PostCard post={post} key={key} />
            ))
            :
            <p>No posts yet in community... Say Hi!</p>
    )
}

export default PostFeed;
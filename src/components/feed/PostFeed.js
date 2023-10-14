import React from 'react'
import PostCard from './PostCard';
import styles from './Feed.module.css';

const PostFeed = ({ feed }) => {

    return (
        <div className={styles.post_feed}>
            {
                feed && feed.length > 0?

                feed.map((post, key) => (
                    <PostCard post={post} key={key} />
                ))
                :
                <p>No posts yet in community... Say Hi!</p>
            }
        </div>
    )
}

export default PostFeed;
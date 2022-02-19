import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { getPosts } from '@Helpers/social';
import styles from '@Styles/Home.module.css';
import Loader from 'react-loader-spinner';

const CommunityHomePage = ({ userId, communityId }) => {

    const [ feed, setFeed ] = useState();
    const [ loading, setLoading ] = useState(true);

    const { register, watch, getValues, handleSubmit } = useForm();

    useEffect(() => {
      
        const getFeed = async () => {
            setFeed(await getPosts(userId));
            setLoading(false);
        }

        getFeed();
    }, [loading])

    const onSubmit = async () => {

        // Upload to Mongo
        let response = await fetch(`/api/social/post`, {
            method: 'POST',
            body: JSON.stringify({
                post: watch('newPost', ""),
                userId: userId,
                communityId: communityId
            })
        });

        setLoading(true);
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <textarea {...register("newPost")} placeholder="What's on your mind?" />
                <input type="submit" />
            </form>
            <div>
                {
                    loading?
                        <Loader
                            type="BallTriangle"
                            style={{marginTop: '100px'}}
                            // type="Puff"
                            color="#00BFFF"
                            height={150}
                            width={150} //3 secs
                        />
                        :
                        feed && feed.length > 0?

                            feed.map((post, key) => (
                                <div key={key}>
                                    <p><span>{post?.author}: </span><b>{post?.post}</b></p>
                                </div>
                            ))
                            :
                            <p>No posts yet in community... Say Hi!</p>
                            
                }
            </div>
        </div>
    )
}

export default CommunityHomePage

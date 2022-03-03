import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { getPosts } from '@Helpers/social';
import styles from '@Styles/Home.module.css';
import Loader from 'react-loader-spinner';
import PostCard from '@Components/feed/PostCard';
import PostFeed from '@Components/feed/PostFeed';

const CommunityHomePage = ({ userId, communityId }) => {

    const [ feed, setFeed ] = useState();
    const [ loading, setLoading ] = useState(true);

    const { register, watch, getValues, handleSubmit } = useForm();

    useEffect(() => {
      
        const getFeed = async () => {
            setFeed(await getPosts(userId, { communityId: communityId }));
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
                        <PostFeed feed={feed} />
                            
                }
            </div>
        </div>
    )
}

export default CommunityHomePage

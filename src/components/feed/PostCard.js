import { useEffect, useState } from 'react';
import styles from './Feed.module.css'
import { DateTime } from 'luxon'
import { fmtUserAddr, fmtComAddr, fmtAddr } from '@Helpers/format';

const PostCard = ({ post, key }) => {

    const [ userName, setUserName ] = useState(fmtAddr(post?.author));
    const [ communityName, setCommunityName ] = useState(fmtAddr(post?.community));

    useEffect(() => {
      Promise.resolve([

      ])
    }, [])
    

    return (
        <div className={styles.post_card} key={key}>
            <div className={styles.post_card_body}>
                <a href={`/u/${post?.author}`}><b>{ userName }: </b></a> <small>{DateTime.fromISO(post.datetime).toLocaleString(DateTime.DATETIME_MED)}</small>
                <p>{post?.post}</p>
            </div>
            <div className={styles.post_card_footer}>
                <span className={styles.post_card_footer_text}>in <a href={`/c/${post?.community}`} >{ comname }</a></span>
            </div>
        </div>
    )
}

export default PostCard;
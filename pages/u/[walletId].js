import Image from 'next/image';
import Layout from '@Components/Layout';
import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css';

const AccountPage = () => {

    const { wallet } = useEth();

    return (
        <Layout>
            <h1 className={styles.content_title}>
                My Profile
            </h1>

            <div className={styles.profile_grid_container}>

                <div className={styles.profile_image_section}>
                    <Image className={styles.profile_image} src={`/placeholder.png`} alt="Community     Placeholder" width={'225'} height={'225'} layout="intrinsic" objectFit='cover' />
                    {wallet}
                </div>

            <div className={styles.profile_info_section}>
                <form className={styles.form}>

                    <div className={styles.form_field}>
                        <input {...register("communityName")} placeholder="Community name" />
                        <small className={styles.form_error}>
                            {}</small>
                    </div>

                    <div className={styles.form_field}>
                        <input {...register("communitySymbol")} placeholder="Community symbol" />
                        {/* <small className={styles.form_error}>
                            {getCommunityNameInformation(watchCommunityName)}</small> */}
                    </div>

                    <div className={styles.form_field}>
                        <textarea {...register("communityDescription")} placeholder="Community description" />
                        <small className={styles.textarea_length}>{watchCommunityDescription?.length}</small>
                        <small className={styles.form_warning}>
                            {getCommunityDescriptionInformation(watchCommunityDescription)}</small>
                    </div>

                    <div className={styles.form_field}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Community Size
                        </label>
                        <input {...register("communitySize")} placeholder="10, 100, 1000000000, ..." />
                        <small className={styles.form_error}>
                            {getCommunitySizeInformation(watchCommunitySize)}</small>
                    </div>

                    <div className={styles.form_field}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Community Token Image
                        </label>
                        <input type="file"
                            accept="image/*"
                            {...register("communityImage")} placeholder="Community image" />
                        <small className={styles.form_error}>
                            {getCommunityImageInformation(watchCommunityImage)}</small>
                    </div>

                    <div className={styles.form_field}>
                        <label>
                            Select the visibility of your Community:
                        </label>
                            <select {...register("visibility")}>
                                <option value="">Visibility...</option>
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                            <small>{getVisibilityInformation(watchVisibility)}</small>
                        </div>

                        {/* <div className={styles.form_field}>
                            <label>
                                Select the visibility of your Community:
                            </label>
                            <select {...register("visibility")}>
                                <option value="">Visibility...</option>
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                            <small>{getVisibilityInformation(watchVisibility)}</small>
                        </div> */}

                        <input type="submit" />
                    </form>
                </div>

                <div className={styles.profile_cards_wrapper}>
                    
                    <h4>Access Cards</h4>

                    <div className={styles.profile_cards_grid}>
                        <div className={styles.profile_cards_item}>
                            ChubbClub
                        </div>
                        <div className={styles.profile_cards_item}>
                            Chess Club
                        </div>
                        <div className={styles.profile_cards_item}>
                            ChubbClub
                        </div>
                    </div>
                </div>

                <div className={styles.profile_section_wrapper}>
                    1
                </div>

            </div>

        </Layout>
    )
}

export default AccountPage;

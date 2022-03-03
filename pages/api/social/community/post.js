/// Endpoints which interact with posts specific to a community

// Import database.
import { connectToDatabase } from '../../../../lib/mongodb'

export default async function handler (req, res) {

    const { db } = await connectToDatabase();
    const posts = db.collection('posts');

    if (req.method === 'GET') {
        // Logic for getting posts from database.

        const { communityId } = req.query;
        // date?
        // page?

        // ! NEED TO FIGURE OUT ALGORITHM TO GET POSTS SEMI-RANDOMLY
        // ! AND SORTED BASED ON TIME.
        console.log(communityId);
        const response = await posts.find({ 'community': communityId }).sort({_id:-1}).toArray();
        return res.json(response);
        
    } else if (req.method === 'POST') {
        // Endpoint for creting a new post in DB

        const body = JSON.parse(req.body);
        const userId = body.userId;
        const communityId = body.communityId;    
        const post = body.post;

        const res = await posts.insert({
                author: userId,
                community: communityId,
                post: post
            });

        res.send(200);
        
    } else if (req.method === 'PUT') {

        res.send(200);
        
    } else if (req.method === 'DELETE') {

        res.send(200);
        
    } else {
        res.send(401);
    }
}
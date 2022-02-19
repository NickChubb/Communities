// Import database.

export default function handler (req, res) {
    if (req.method === 'GET') {
        // Endpoint to get individual post by ID.

        const { postId } = req.query;
        const userId = req.body.data.userId;
        const communityId = req.body.data.communityId;
        
        // Get from database

        res.send(200);
        
    } else if (req.method === 'PUT') {
        // Endpoint for updating individual post by ID.

        const { postId } = req.query;
        const userId = req.body.data.userId;
        const communityId = req.body.data.communityId;

        // Update in Mongo

        res.send(200);
        
    } else if (req.method === 'DELETE') {
        // Endpoint for deleting individual post by ID.

        const { postId } = req.query;
        const userId = req.body.data.userId;
        const communityId = req.body.data.communityId;


        res.send(200);
        
    } else {

    }
  }
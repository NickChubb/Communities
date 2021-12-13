import { createCommunity } from "lib/scripts/deployCommunity"; 

export default function handler (req, res) {
    if (req.method === 'POST') {

        const communityName = req.body.data.communityName;
        const communitySize = req.body.data.communitySize;
        const communityImage = req.body.data.communityImage;
        const communityVisibility = req.body.data.visibility;
      
        // Create new smart contract with the input parameters
        console.log(req.body.data);

        createCommunity();

        res.send(200);
        
    } else {
      // Handle any other HTTP method
    }
  }
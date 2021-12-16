// import * as IPFS from 'ipfs-core'
// import { cidToUrl } from '@Helpers/ipfs';

// export default function handler (req, res) {

//     // POST method uploads request data to IPFS
//     if (req.method === 'POST') {

//         // Initialize IPFS
//         const ipfs = await IPFS.create();

//         // Upload Image to IPFS
//         const image = await ipfs.add()

//         // Create JSON document
//         const metadata = {
//             "name": req.body.name,
//             "symbol": req.body.symbol,
//             "description": req.body.description,
//             "size": req.body.size,
//             "image": cidToUrl(image.cid),
//             "visibility": req.body.visibility
//         }

//         // Upload JSON file to IPFS
//         const { cid } = await ipfs.add(new File(
//             metadata, 
//             'metadata.json'));

//         res.status(200).send( cidToUrl(cid) );
        
//     } else {
//       // Handle any other HTTP method
//     }
// }

// export const config = {
//     api: {
//       bodyParser: {
//         sizeLimit: '10mb',
//       },
//     },
//   }
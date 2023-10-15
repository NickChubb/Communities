import nextConnect from "next-connect"
import multiparty from "multiparty"
import pinataSDK from "@pinata/sdk"
import fs from "fs"

const pinata = pinataSDK(
  "6008b3888064eea148e3",
  "54a1d3038de40f68f27b822f009806fa6817de247b8e51fea894f92874e3779e"
)

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

// // Returns middleware that processes multiple files sharing the same field name.
// const uploadMiddleware = upload.single('theFiles');

// Adds the middleware to Next-Connect
apiRoute.use(async (req, res, next) => {
  const form = new multiparty.Form()

  await form.parse(req, function (err, fields, files) {
    if (err) console.log(err)
    req.body = fields
    req.files = files
    next()
  })
})

// Process a POST request
apiRoute.post(async (req, res) => {
  console.log(`POST /api/ipfs`)

  // Upload Image to IPFS via Pinata
  console.log(`Uploading image to IPFS...`)
  const imageStream = fs.createReadStream(req.files.communityImage[0].path)
  const pinnedImage = await pinata.pinFileToIPFS(imageStream).catch(err => {
    console.log(err)
  })
  console.log(
    `SUCCESS! Community image uploaded with CID: ${pinnedImage.IpfsHash}`
  )

  // Create JSON document
  const metadata = {
    name: req.body.communityName[0],
    symbol: req.body.communitySymbol[0],
    description: req.body.communityDescription[0],
    size: req.body.communitySize[0],
    image: `ipfs://${pinnedImage.IpfsHash}`,
    private: req.body.private[0],
  }

  // Upload JSON file to IPFS via Pinata
  console.log(`Uploading Metadata to IPFS...`)
  const pinnedMetadata = await pinata.pinJSONToIPFS(metadata).catch(err => {
    console.log(err)
  })
  console.log(`SUCCESS! Metadata uploaded with CID: ${pinnedMetadata.IpfsHash}`)

  res.status(200).send(`ipfs://${pinnedMetadata.IpfsHash}`)
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}

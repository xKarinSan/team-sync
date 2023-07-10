import { NextApiRequest,NextApiResponse} from "next";

const handler = (req:NextApiRequest, res: NextApiResponse) => {
    const body = req.body
    res.status(200).json({message:"OK"})
}

import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { MongoClient, Collection } from 'mongodb';

export interface NextApiRequestExtended extends NextApiRequest {
  collection: Collection
}

const client = new MongoClient('mongodb+srv://l2new_next:l2new_next@cluster0.gkl11.mongodb.net/ServersDb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


export default function getHandler() {
  return nextConnect<NextApiRequestExtended, NextApiResponse>({
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
  }).use(async (req, res, next) => {

    if (!client.isConnected()) await client.connect();
    req.collection = client.db("ServersDb").collection("Servers");
    next();
  })
};
import { MongoClient } from "mongodb";

const URL =
  "mongodb+srv://nextjs:H8D3aPutLS1HMV4G@cluster0.3lpku.mongodb.net/web-blog?retryWrites=true&w=majority";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(URL);
  return client;
};

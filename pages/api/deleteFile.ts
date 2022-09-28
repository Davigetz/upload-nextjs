import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(500).json({ error: `Not ${req.method} Allowed` });
  },
});

apiRoute.delete((req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
  res.status(200).send({ data: "is donas" });
});

export default apiRoute;

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
  const directoryPath = "./public/uploads/";
  fs.rm(directoryPath, { recursive: true, force: true }, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    res.status(200).send({
      message: "files and directory deleted",
    });
  });
});

export default apiRoute;

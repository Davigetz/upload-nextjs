import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { store } from "../../app/store";
import path from "path";
import nextConnect from "next-connect";
import cloud from "../../app/utils/cloudinary";

export const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      const error = new Error("Unsupported file type!");
      cb(error as unknown as null, false);
      return;
    }
    cb(null, true);
  },
});

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single("image");
apiRoute.use(uploadMiddleware);

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @ts-ignore
    const result = await cloud.uploader.upload(req.file.path);
    res.status(200).json({
      result: {
        id: result.public_id,
        url: result.secure_url,
        name: result.original_filename,
      },
    });
  } catch (error) {
    console.info("soy error");
    console.log(error);
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const {
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = require("../lib/s3");

const uploadImage = async (
  req,
  res
) => {

  try {

    const file = req.file;

    const fileName =
      `${Date.now()}-${file.originalname}`;

    await s3.send(

      new PutObjectCommand({

        Bucket:
          process.env.AWS_BUCKET_NAME,

        Key: fileName,

        Body: file.buffer,

        ContentType:
          file.mimetype,

      })

    );

    const imageUrl =

      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    res.json({

      imageUrl,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error:
        "Image upload failed",

    });

  }

};

module.exports = {
  uploadImage,
};
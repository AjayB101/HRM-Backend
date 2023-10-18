const cloudinary = require("cloudinary").v2;

exports.uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "image",
        folder: folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            public_id: result.public_id,
            url: result.url,
          });
        }
      }
    );
  });
};

exports.cloudinaryDeleteImg = (async(pubId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(pubId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      }
    });
  });
});

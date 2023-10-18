const cloudinary =  require('cloudinary').v2
exports.uploads = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, {
            resource_type: "image",
            folder: 'profile',
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({
                    public_id: result.public_id,
                    url: result.url
                });
            }
        });
    });
};
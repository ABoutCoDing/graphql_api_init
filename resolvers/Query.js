const {photos, users} = require('../dummy');
module.exports = {
  hello: (root, args, context) => "Hello world!",
  totalPhotos: () => photos.length,
  allPhotos: (parent, args) => {
    console.log(args);
    return photos;
  }
}
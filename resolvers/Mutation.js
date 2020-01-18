module.exports = {
  postPhoto(parent, args) {
    let newPhoto = {
      id: _id++,
      ...args.input,
      created: new Date()
    };
    photos.push(newPhoto);
    return newPhoto;
  }
}
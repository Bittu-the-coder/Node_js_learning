const fs = require('fs')

exports.deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully:', filePath);
    }
  });
}

existingHome.location = location;
existingHome.rating = rating;
if (req.file) {
  deleteFile(existingHome.photo);
  existingHome.photo = req.file.path;
}
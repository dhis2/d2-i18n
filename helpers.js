var fs = require('fs');
var path = require('path');

var supportedExtensions = ['.js', '.jsx'];

module.exports.walk = function walk(dirPath, files = []) {
  var list = fs.readdirSync(dirPath);

  var stat, ext, filePath;
  for (var fileName of list) {
    filePath = path.join(dirPath, fileName);
    stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      walk(filePath, files);
    } else if (stat.isFile() && !stat.isSymbolicLink()) {
      ext = path.extname(fileName);

      if (supportedExtensions.includes(ext)) {
        files.push(filePath);
      }
    }
  }

  return files;
};

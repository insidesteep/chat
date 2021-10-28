const getFileExtension = (file) => file.fileName.split(".").pop();

const isImage = (file) => {
  const types = ["jpeg", "jpg", "png", "svg", "gif", "bmp"];

  return types.indexOf(getFileExtension(file).toLowerCase()) > -1;
};

module.exports = { isImage };

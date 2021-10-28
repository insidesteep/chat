import { SERVER_URL } from "./config";

const getFileExtension = (file) => {
  const fileName = file.fileName || file.name;

  return fileName.split(".").pop();
};

const isImage = (file) => {
  const types = ["jpeg", "jpg", "png", "svg", "gif", "bmp"];

  return types.indexOf(getFileExtension(file).toLowerCase()) > -1;
};

const convertToMb = (byte) => Math.floor(byte / 1048576);

const correctFilePath = (path) =>
  path.includes("blob:http") ? path : `${SERVER_URL}/${path}`;

export { getFileExtension, isImage, convertToMb, correctFilePath };

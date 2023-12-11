const { generateComponents } = require("@uploadthing/react");

/**
 * @typedef {import("@/app/api/uploadthing/core").OurFileRouter} OurFileRouter
 */

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents();


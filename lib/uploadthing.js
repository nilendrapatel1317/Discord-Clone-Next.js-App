const { generateComponents } = require("@uploadthing/react");

// If you want to use `OurFileRouter` type in JavaScript,
// you can use the JSDoc syntax to provide type information
/**
 * @typedef {import("@/app/api/uploadthing/core").OurFileRouter} OurFileRouter
 */

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents();


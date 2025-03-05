export enum stateUpload {
  uploading = "uploading",
  done = "done",
  error = "error",
}

export interface FileUpload {
  file: File;
  state: stateUpload;
}

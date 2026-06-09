export interface UploadDropzoneProps {
  isDisabled: boolean;
  label: string;
  hint: string;
  onFilesAdded: (files: FileList) => void;
}

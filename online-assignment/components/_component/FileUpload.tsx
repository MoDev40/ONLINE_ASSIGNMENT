import { UploadDropzone } from '@/utils/Uploadthing';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

type FileUploadProps = {
  onValueChange:(value: string) => void;
  setFileKey:Dispatch<SetStateAction<string | undefined>>;
}

const FileUpload = ({ onValueChange, setFileKey }:FileUploadProps) => {
  return (
    <main className="flex h-auto flex-col items-center justify-between p-8">
      <UploadDropzone
        className="ut-label:hidden ut-allowed-content:hidden"
        endpoint="fileUploader"
        onClientUploadComplete={(res:any) => {
          onValueChange(res[0].url)
          setFileKey(res[0].key)
          toast.success("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  )
}

export default FileUpload
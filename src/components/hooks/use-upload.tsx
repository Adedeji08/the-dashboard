// useFileUpload.ts
import { useState } from "react";
const baseURL =  process.env.REACT_APP_BACKEND_URL='https://staging-api.admin.vendstash.com'

interface FileUpload {
  uploadFiles: (
    files: File[],
    onProgress?: (progress: number) => void
  ) => Promise<{
    success: boolean;
    message: string;
    data?: string[] | undefined;
  }>;
  loading: boolean;
  progress: number;
  uploadedImages: string[];
}

const useFileUpload = (
  url: string,
  onSuccess?: (result: any) => void,
  onError?: (error: string) => void
): FileUpload => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const uploadFiles = async (
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<{
    success: boolean;
    message: string;
    data?: string[] | undefined;
  }> => {
    try {
      setLoading(true);

      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("files", file);

        return new Promise<{
          success: boolean;
          message: string;
          data?: string | undefined;
        }>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `${baseURL}${url}`, true);

          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const calculatedProgress = Math.round((e.loaded * 100) / e.total);
              setProgress(calculatedProgress);
              if (onProgress) {
                onProgress(calculatedProgress);
              }
            }
          };

          xhr.onload = () => {
            if (xhr.status === 201) {
              const result = JSON.parse(xhr.responseText);
              if (result.status) {
                resolve({
                  success: true,
                  message: result.message,
                  data: result.data,
                });
                // showToast(result.message, true, {
                //   position: "top-center",
                // });
              } else {
                reject({
                  success: false,
                  message: result.message || "File upload failed",
                });
                // showToast(result.message, false, {
                //   position: "top-center",
                // });
              }
            } else {
              reject({
                success: false,
                message: `HTTP error! Status: ${xhr.status}`,
              });
            }
          };

          xhr.onerror = () => {
            reject({
              success: false,
              message: "An error occurred during file upload",
            });
          };

          xhr.send(formData);
        });
      });

      const results = await Promise.all(uploadPromises);

      // Extract data from results
      const uploadedImagesData = results
        .map((result) => result.data)
        .filter(Boolean) as string[];

      setLoading(false);
      setProgress(0);

      return {
        success: true,
        message: "Files uploaded",
        data: uploadedImagesData,
      };
    } catch (error: any) {
      setLoading(false);
      setProgress(0);

      return {
        success: false,
        message: error.message || "An error occurred during file upload",
      };
    }
  };

  return { uploadFiles, loading, progress, uploadedImages };
};

export default useFileUpload;

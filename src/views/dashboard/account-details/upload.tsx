import React, { useEffect, useRef, useState } from "react";
import useFileUpload from "../../../components/hooks/use-upload";
// import Toast from "../../components/toast";
import classNames from "classnames";
// import ArrowUp from "../../assets/images/arrow-up-icon.svg";
// import ArrowMarked from "../../assets/images/arrow-marked-icon.svg";

const UploadEvidence = ({ onChange, setFiles }: any) => {
  const { uploadFiles, loading, progress } = useFileUpload("/upload");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    setShowProgress(loading);
  }, [loading]);

  useEffect(() => {
    if (loading) {
      const estimatedTimeRemaining = Math.round((100 - progress) * 100);
      setRemainingTime(estimatedTimeRemaining);
    } else {
      setRemainingTime(progress === 100 ? 100 : null);
    }
  }, [loading, progress]);

  useEffect(() => {
    if (loading && progress === 100) {
      setUploadSuccess(true);
    }
  }, [loading, progress]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      const response = await uploadFiles(fileList);
      if (response && response.data) {
        setFiles(response.data);
      }
      if (onChange) {
        onChange(fileList);
      }
    } else {
      setFiles([]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files) {
      const fileList = Array.from(files);
      setUploadedFiles(fileList);
      uploadFiles(fileList);

      if (onChange) {
        onChange(fileList);
      }
    }
  };

  return (
    <div>
      <div>
        <div
          className={classNames(
            "rounded-lg p-4 flex justify-center h-[160px] items-center flex-col w-full mt-4",
            {
              "bg-[#EAEAEA]": uploadSuccess,
              "border-dashed border-2 border-gray-400":
                !uploadSuccess,
            }
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {/* <img src={uploadSuccess ? ArrowMarked : ArrowUp} alt="Image" /> */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className={classNames("file-upload-button", "font-bold", {
              "bg-gray-300": isDragging,
            })}
          >
            <span className="text underline">Click to upload</span> or drag and
            drop
          </button>
          <p className="text-[#040821]">Maximum file size 100mb</p>

          {/* <Toast /> */}
        </div>
        {uploadSuccess && (
          <div className="border-solid border-2 border-gray-400 rounded-md p-2 pl-10 h-18 items-center w-full mt-5">
            <>
              <p className="font-bold text-[14px]">
                {loading ? "Uploading..." : "Completed"}
              </p>
              {loading && remainingTime !== null ? (
                <p className="text-[14px]">
                  {remainingTime > 0
                    ? `${remainingTime} secs remaining`
                    : "Finishing up..."}
                </p>
              ) : (
                <p className="text-[14px]">{"100%"}: completed</p>
              )}
            </>

            <div className="progress-bar h-2 border ">
              <div
                className="h-[2px] bg-blue-500"
                style={{ width: `background: blue ${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadEvidence;

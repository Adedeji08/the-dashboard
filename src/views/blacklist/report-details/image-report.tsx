import React, { useState } from "react";
import { Modal } from "antd";
import Icon from "../../../assets/icons";

const ImageReport = ({ visible, handleClose, images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const nextIndex =
      currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex =
      currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const downloadImage = (url: any) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      closable={true}
      footer={null}
      width={790}
      className="flex justify-center items-center mt-14"
    >
      <div className="flex justify-between px-6 py-4 w-full">
        <h1 className="font-bold text-left text-[#040821] text-[18px] mb-4">
          Media
        </h1>
        <button
          className="text-white bg-[#0979A1] rounded-md hover:bg-blue-700 font-bold py-2 px-4 inline-flex gap-3 items-center"
          onClick={() =>
            images.forEach((image: any) => downloadImage(image))
          }
        >
          <Icon name="downloadIcon" /> Download All
        </button>
      </div>
      <div className="">
        <div className="custom-slider">
          <div className="slider-images flex mx-auto">
            <div className="slide">
              <img
                src={images[currentIndex]}
                alt="Slide"
                className="slide-image"
              />
            </div>
          </div>
          <div className="slider-controls">
            <button
              className={`custom-arrow custom-prev ${
                currentIndex === 0 ? "hidden" : ""
              }`}
              onClick={goToPrevSlide}
            >
              <Icon name="slideBackwardIcon" />
            </button>
            <button
              className={`custom-arrow custom-next ${
                currentIndex === images.length - 1 ? "hidden" : ""
              }`}
              onClick={goToNextSlide}
            >
              <Icon name="slideForwardIcon" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageReport;

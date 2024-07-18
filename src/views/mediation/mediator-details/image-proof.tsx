import React, { useState } from "react";
import { Modal } from "antd";
import Icon from "../../../assets/icons";

const ImageProof = ({ visible, handleClose, images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const nextIndex = currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex =
      currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      closable={true}
      footer={null}
      width={690}
    >
      <div className="py-4 w-full">
        <h1 className="font-bold text-center text-[#040821] text-[18px] mb-4">
          Image {currentIndex + 1}
        </h1>
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

export default ImageProof;

import React, { useState } from "react";
import Icon from "../../../assets/icons";
import ImageProof from "./image-proof";

const ImagesDisplayed = ({ images }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const viewImage = () => {
    setModalVisible(true);
  };
  const downloadImage = (url: any) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = url.split("/").pop() || "download";
        link.dispatchEvent(
          new MouseEvent("click", { bubbles: true, cancelable: true })
        );
        URL.revokeObjectURL(url);
      });
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Media</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((picture: any, index: any) => (
          <div onClick={viewImage} key={index} className="relative group cursor-pointer">
            <img
              src={picture}
              alt={`pics ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 rounded-b-md">
              Receipt of Purchase
            </div>
            <button
              onClick={() => images.forEach(downloadImage)}
              className="absolute top-2 right-2 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="saveIcon" />
            </button>
          </div>
        ))}
      </div>
      <ImageProof
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
        images={images}
      />
    </div>
  );
};

export default ImagesDisplayed;

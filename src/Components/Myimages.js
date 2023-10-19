import React from "react";
import Images from "./Images";
import ShowModal from "./ShowModal";

const Myimages = ({
  handleImageClick,
  selectedImage,
  mode,
  closeImageModal,
}) => {
  const myImagesArray = JSON.parse(localStorage.getItem("myimages")) || [];
  console.log(myImagesArray);
  return (
    <div>
      <h1
        className="text-center my-3"
        style={{ color: `${mode === "dark" ? "black" : "white"}` }}
      >
        My Starred Images
      </h1>
      <div
        className={`${selectedImage ? "modal_gridcontainer" : "gridcontainer"}`}
      >
        {myImagesArray.length === 0 ? (
          <h5 className="text-center my-3" style={{width:'100vw',color: `${mode === "dark" ? "black" : "white"}`}}>No images starred to show..</h5>
        ) : (
          myImagesArray.map((staredImage, index) => (
            <div
              key={`${staredImage.id}_${index}`}
              onClick={() => handleImageClick(staredImage)}
              style={{
                opacity:
                  selectedImage && selectedImage.id === staredImage.id
                    ? 0.5
                    : 1,
              }}
            >
              <Images image={staredImage} mode={mode} />
            </div>
          ))
        )}
      </div>
      {selectedImage && (
        <ShowModal selectedImage={selectedImage} onClose={closeImageModal} />
      )}
    </div>
  );
};

export default Myimages;

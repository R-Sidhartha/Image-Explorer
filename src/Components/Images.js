import React, { useEffect, useState } from "react";

const Images = ({ image, mode, handlestarbtn }) => {
  const [startype, setstartype] = useState("regular");
  if (!localStorage.getItem("myimages")) {
    localStorage.setItem("myimages", JSON.stringify([]));
  }
  useEffect(() => {
    // Load starred images from local storage
    const myImagesArray = JSON.parse(localStorage.getItem("myimages")) || [];
    const index = myImagesArray.findIndex((img) => img.id === image.id);
    if (index !== -1) {
      setstartype("solid");
    }
  }, [image.id]);

  const handlestar = (image) => {
    // Load the existing starred images from local storage
    const myImagesArray = JSON.parse(localStorage.getItem("myimages")) || [];

    // Find the index of the clicked image in the array
    const index = myImagesArray.findIndex((img) => img.id === image.id);

    if (index === -1) {
      // Image is not starred, so add it
      const staredImage = {
        id: image.id,
        urls: image.urls,
        user: image.user,
        links: image.links,
        updated_at: image.updated_at,
        alt_description: image.alt_description,
        stared: true,
      };
      myImagesArray.push(staredImage);
      setstartype("solid");
    } else {
      // Image is already starred, so remove it
      myImagesArray.splice(index, 1);
      setstartype("regular");
    }
    console.log(myImagesArray);
    // Update the local storage with the modified `myimages` array
    localStorage.setItem("myimages", JSON.stringify(myImagesArray));
  };

  return (
    <div
      className="container"
      style={{ color: `${mode === "dark" ? "black" : "white"}` }}
    >
      <div className="image">
        <img src={image.urls.raw} alt={image.alt_description} />
        <div className="image-info d-flex justify-content-between">
          <p className="my-3" style={{ fontSize: "12px" }}>
            <img
              className="mx-2"
              src={`${image.user.profile_image.small}`}
              alt="profile-pic"
              style={{ width: "25px", borderRadius: "20px" }}
            />
            Photographer: {image.user.name}
          </p>
          <p className="my-3 mx-2">
            <i
              className={`fa-${startype} fa-star fa-sm mx-2`}
              onClick={() => handlestar(image)}
              style={{ cursor: "pointer" }}
            ></i>
            <i className="fa-solid fa-thumbs-up fa-sm mx-2"></i> {image.likes}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default Images;

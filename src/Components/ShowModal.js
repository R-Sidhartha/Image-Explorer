import React, { useEffect, useState } from "react";
import "./home.css";

function ShowModal({ selectedImage, onClose }) {
  const [width,setwidth]=useState('80%')

useEffect(() => {
  if (selectedImage && selectedImage.width > selectedImage.height) {
    setwidth('90%');
  } else {
    setwidth('50%'); 
  }
}, [selectedImage]);
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
const formattedDate = formatDate(selectedImage.updated_at);

  return (
    <div className="modal-container " style={{marginTop:'00px'}}>
      <div className="close" style={{ float: "left", marginLeft: "92%" }}>
        <button
          className="btn my-3"
          style={{
            color: "black",
            borderRadius: "10px",
            background: "white",
            padding: "1px 5px",
          }}
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark fa-lg"></i>
        </button>
      </div>
      <div className="content" >
      <p className="text-center">"{selectedImage.alt_description}"</p>
        <img
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
          style={{ width: width,height:'auto' }}
        />

        <div className="image-details my-2" style={{width:'100%'}}>
          <div className="d-flex justify-content-between">
          <p>
            <img
              className="mx-2"
              src={`${selectedImage.user.profile_image.small}`}
              alt="profile-pic"
              style={{ width: "30px", borderRadius: "20px" }}
            />
            <span style={{textDecoration:'underline',color:'rgb(149, 255, 119)'}}>Photographer</span>: {selectedImage.user.name}<a href="https://unsplash.com/" style={{color:'#407195'}}>(Unsplash)</a>
          </p>
              <span className="mx-4"><span style={{textDecoration:'underline',color:'rgb(149, 255, 119)'}}>Updated on</span>: {formattedDate}</span>
              
          </div>
         <div className="d-flex justify-content-between ">
          <div className="socailmedia">
            <h6 className="ml-5"style={{textDecoration:'underline',color:'rgb(149, 255, 119)'}}>Social Media Links: </h6>
            <div className="icons">
            <a
              href={`https://www.instagram.com/${selectedImage.user.social.instagram_username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "black",
                margin: "0px 10px",
              }}
            >
              <i className="fa-brands fa-square-instagram fa-xl"></i>
            </a>
            <a
              href={`https://twitter.com/${selectedImage.user.social.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "black",
                margin: "0px 10px",
              }}
            >
              <i className="fa-brands fa-square-twitter fa-xl"></i>
            </a>
            <a
              href={selectedImage.user.social.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "black",
                margin: "0px 10px",
              }}
            >
              <i className="fa-solid fa-earth-americas fa-xl"></i>
            </a>
            </div>
          </div>
          <p className=" mx-5 d-flex">
            <div className="likebtn  mx-2">
            <i className="fa-solid fa-thumbs-up fa-xl mx-2"></i>{" "}
            {selectedImage.likes}
            </div>
            <div className="downloadbtn">
            <a
                className="close"
                href={selectedImage.links.download}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgb(149, 255, 119)",
                  margin: "0px 10px",
                }}
              >
                <i className="fa-solid fa-download fa-l"></i>
              </a>
              </div>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowModal;

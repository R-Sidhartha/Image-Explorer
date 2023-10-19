import React, { useEffect, useState } from "react";
import Images from "./Images";
import "./home.css";
import ShowModal from "./ShowModal";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
function Home({ mode, handleImageClick, selectedImage, closeImageModal }) {
  const [images, setimages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setpage] = useState(1);
  const [searchpage, setsearchpage] = useState(1);

  const access_key = process.env.REACT_APP_UNSPLASH_APIKEY;
  useEffect(() => {
    // API call using  fetchImages function
    async function fetchImages() {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos?page=${page}&client_id=${access_key}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images from Unsplash");
        }

        const data = await response.json();
        setimages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    // Call fetchImages when the component mounts
    fetchImages();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    async function searchUnsplash(searchQuery) {
      if (searchQuery) {
        try {
          const searchresponse = await fetch(
            `https://api.unsplash.com/search/photos?page=${searchpage + 1}${
              searchQuery ? `&query=${searchQuery}` : "&query=random"
            }&client_id=${access_key}`
          );

          if (!searchresponse.ok) {
            throw new Error(
              `Failed to fetch images from Unsplash: ${searchresponse.status}`
            );
          }

          const searchdata = await searchresponse.json();
          setSearchResults(searchdata);
        } catch (error) {
          console.error("Error fetching images:", error);
          return null;
        }
      }
    }
    // Call searchUnsplash when searchQuery changes
    searchUnsplash(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]); // Include searchQuery as a dependency

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchMoreData = async () => {
    setpage(page + 1);
    let url = `https://api.unsplash.com/photos?page=${
      page + 1
    }&client_id=${access_key}`;
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch images from Unsplash: ${response.status}`
      );
    }
    const data = await response.json();
    setimages(images.concat(data));
  };
  const searchfetchMoreData = async () => {
    // console.log(url)
    setsearchpage(searchpage + 1);
    let searchurl = `https://api.unsplash.com/search/photos?page=${
      searchpage + 1
    }${
      searchQuery ? `&query=${searchQuery}` : "&query=random"
    }&client_id=${access_key}`;
    let response = await fetch(searchurl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch images from Unsplash: ${response.status}`
      );
    }
    const searchdata = await response.json();
    setSearchResults({
      ...searchResults,
      results: searchResults.results.concat(searchdata.results),
    });
  };

  const [visible, setVisible] = useState(false);

  const handleScrollTop = () => {
    if (window.scrollY > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollTop);
    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  const inputstyle = {
    background: `${mode !== "dark" ? "rgba(41, 40, 40, 0.44)" : "white"}`,
    color: `${mode === "dark" ? "black" : "white"}`,
  };
  return (
    <div>
      <div
        className={`${
          mode === "light" ? "darkmode_search" : "search"
        } d-flex justify-content-center align-items-center flex-column`}
        style={{ height: "48vh" }}
      >
        <h2 className={`${mode === "light" ? "searchtitle" : ""} text-center`}>
          Explore the World Through Images
        </h2>
        <h7 className={`${mode === "light" ? "searchtitle" : ""}`}> "Instantly Find Stunning Photos with Our Search"</h7>
        <div className="searchbar d-flex my-3">
          <input
            className="form-control mr-sm-2 input-placeholder"
            type="search"
            placeholder="Search here ..."
            aria-label="Search"
            value={searchQuery}
            onChange={handleInputChange}
            style={inputstyle}
          />
        </div>
      </div>
      <div
        className="heading my-3"
        style={{ color: `${mode === "dark" ? "black" : "white"}` }}
      >
        {searchQuery && searchResults.results ? (
          <h2 className="text-center">Images Based on {`${searchQuery}`} </h2>
        ) : (
          <h2 className="text-center">Image Gallery</h2>
        )}
      </div>
      <div className={`${selectedImage ? "modal_image-grid" : "image-grid"}`}>
        {searchResults && searchResults.results ? (
          <InfiniteScroll
            dataLength={searchResults.results.length}
            next={searchfetchMoreData}
            hasMore={searchResults.total_pages > searchpage}
            loader={<Spinner />}
          >
            <div
              className={`${
                selectedImage ? "modal_gridcontainer" : "gridcontainer"
              }`}
            >
              {searchResults.results.map((image, index) => (
                <div
                  key={`${image.id}_${index}`}
                  onClick={() => handleImageClick(image)}
                  style={{
                    opacity:
                      selectedImage && selectedImage.id === image.id ? 0.5 : 1,
                  }}
                >
                  <Images image={image} mode={mode} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            dataLength={images.length}
            next={fetchMoreData}
            hasMore={images.length !== 0}
            loader={<Spinner />}
          >
            <div
              className={`${
                selectedImage ? "modal_gridcontainer" : "gridcontainer"
              }`}
            >
              {images.map((image, index) => (
                <div
                  key={`${image.id}_${index}`}
                  onClick={() => handleImageClick(image)}
                  style={{
                    opacity:
                      selectedImage && selectedImage.id === image.id ? 0.5 : 1,
                  }}
                >
                  <Images image={image} mode={mode} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
      {selectedImage && (
        <ShowModal selectedImage={selectedImage} onClose={closeImageModal} />
      )}
      <div
        className={`ScrollToTop ${visible ? "" : "d-none"}`}
        onClick={scrollToTop}
      >
        <b>&#8963;</b>
      </div>
    </div>
  );
}

export default Home;

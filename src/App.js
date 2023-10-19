import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Myimages from "./Components/Myimages";

function App() {
  const key='mode';
  const value=localStorage.getItem(key)
  const[mode,setMode]=useState(()=>{
    if (value==='light'|| value===null) {
      return 'dark'
    }
    return 'light'
  }) // Set initial mode to "light" if no value found in local storage
  const[color,setcolor]=useState("black") // Set initial color to "black" if no value found in local storage

  document.body.style.backgroundColor=value==='dark'?'#060a14':'#c0fcfc'

  const darkmode=(e)=>{
    e.preventDefault()
    if (mode==='light') {
      setMode("dark")
      document.body.style.backgroundColor='#c0fcfc'
      setcolor('black')
    }
    else{
      setMode('light')
      document.body.style.backgroundColor='#060a14' 
      setcolor('white')
    }
    localStorage.setItem("mode",mode)
  }
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (window.innerWidth <= 750) {
      document.body.style.overflow = 'hidden';
    }  };
     // Close the modal
  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'visible';
  };
 
  return (
    <div>  
     <Router>
        <Header mode={mode} darkmode={darkmode} />
        <Routes>
          <Route exact path="/" element={<Home color={color} mode={mode} handleImageClick={handleImageClick} selectedImage={selectedImage} closeImageModal={closeImageModal}/>} />
          <Route exact path="/staredimages" element={<Myimages color={color} mode={mode} handleImageClick={handleImageClick} selectedImage={selectedImage} closeImageModal={closeImageModal}/>} />
        </Routes>
      </Router>
      </div>  );
}

export default App;

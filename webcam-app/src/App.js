import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const receiptPopupRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(error => {
          console.error("Error accessing the webcam: ", error);
        });
    } else {
      console.error("getUserMedia not supported by this browser.");
    }

    const handleClick = () => {
      receiptPopupRef.current.classList.toggle('receiptPopupIn');
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div id="container">
      <video id="webcam" ref={videoRef} autoPlay></video>
      <div id="header"></div>
      <div id="receiptPopup" ref={receiptPopupRef}>Claim 3 LOCL</div>
    </div>
  );
}

export default App;

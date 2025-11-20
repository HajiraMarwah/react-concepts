import React, { useState } from "react";

function Carousel({ images }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((i) => (i + 1) % images.length);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <div style={{ width: 300, margin: "auto", textAlign: "center" }}>
     
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        style={{ width: "100%", display: "block", margin: "0 auto" }}
      />
       <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
    </div>
  );
}

export default function App() {
  const imgs = [
    "https://picsum.photos/id/1018/300/200",
    "https://picsum.photos/id/1023/300/200",
    "https://picsum.photos/id/1035/300/200",
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple Carousel</h1>
      <Carousel images={imgs} />
    </div>
  );
}

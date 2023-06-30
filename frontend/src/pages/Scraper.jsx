import { useEffect, useState } from "react";

const Scraper = () => {
  const [images, setImages] = useState({});

  useEffect(() => {
    fetch("http://localhost:5001/api/scraper/all-images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images);
      });
  }, []);

  return (
    <div>
      Scraper
      {Object.entries(images).map(([name, base64Img]) => (
        <div key={name}>
          <img src={`data:image/jpeg;base64,${base64Img}`} alt={name} />
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default Scraper;

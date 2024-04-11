import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState(""); // Adiciona um estado para armazenar o valor do input
  const [imageList, setImageList] = useState<string[]>([
    "/src/assets/incredible.png",
  ]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleAddImage = () => {
    if (inputValue) {
      setImageList((prevImageList) => [...prevImageList, inputValue]);
      setInputValue("");
    }
  };

  return (
      <div className="flex flex-col center justify-between">
        <input
          type="text"
          placeholder="Type here image link"
          className="input input-bordered w-full max-w-xs"
          value={inputValue}  
          onChange={handleInputChange}  
        />
        <button onClick={handleAddImage}>Add Image</button>
        {imageList.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} />
        ))}
      </div>
  );
}

export default App;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [goldPricePerGram, setGoldPricePerGram] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  
  useEffect(() => {
    //const apiUrl = process.env.local.NEXT_PUBLIC_BACKEND_URL;

    axios.get("https://casestudy-vgnh.onrender.com/api/products")
      .then(res => {
        setProducts(res.data.products);
        setGoldPricePerGram(res.data.goldPricePerGram);
      })
      .catch(err => {
        console.error("Veri çekme hatası:", err);
      });

  }, []);

  const handleColorClick = (productId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  return (
    <div className="container">
      <header className="header">
        <div>Product List</div>
      </header>

      <div className="productsContainer">
        {products.length > 0 ? (
          <div className="productsInfos">
            
          {products.map(product => {
            const selectedColor = selectedColors[product.id] || "yellow"; // default yellow
            return (
              <div key={product.id}>
                <img 
                  className="productImages" 
                  src={product.images[selectedColor]} 
                  alt={product.name} 
                  width="210" 
                  height="210"
                />
                <h2>{product.name}</h2>
                <div>${product.priceUSD} USD</div>

                <div className="colorChoice">
                  <div 
                    className="yellowGold colorCircle" 
                    onClick={() => handleColorClick(product.id, "yellow")}
                  ></div>
                  <div 
                    className="whiteGold colorCircle" 
                    onClick={() => handleColorClick(product.id, "white")}
                  ></div>
                  <div 
                    className="roseGold colorCircle" 
                    onClick={() => handleColorClick(product.id, "rose")}
                  ></div>
                </div>
              
                <div className="colorResult">
                  {selectedColor === "yellow" && <p>Yellow Gold</p>}
                  {selectedColor === "white" && <p>White Gold</p>}
                  {selectedColor === "rose" && <p>Rose Gold</p>}
                </div>
              </div>
            );
          })}
        </div>
        ) : (
          <p>Yükleniyor...</p>
        )}
        </div>
    </div>
  );
}

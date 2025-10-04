"use client";
import { useEffect, useState, useRef, use} from "react";
import axios from "axios";
import StarRating from "@/components/starComponent";

import FilterBar from "./filterBar";

export default function Home({searchParams}) {
  const [products, setProducts] = useState([]);
  const [goldPricePerGram, setGoldPricePerGram] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const scrollRef = useRef();
  const params = use(searchParams);
  const minPrice = params.minPrice || "";
  const maxPrice = params.maxPrice || "";
  const minPopularity = params.minPopularity || "";
  const maxPopularity = params.maxPopularity || "";

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}&minPopularity=${minPopularity}&maxPopularity=${maxPopularity}`;

    //const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    axios.get(`${apiUrl}`)
      .then(res => {
        setProducts(res.data.products);
        setGoldPricePerGram(res.data.goldPricePerGram);
      })
      .catch(err => {
        console.error("Veri çekme hatası:", err);
      });

  }, [minPrice, maxPrice, minPopularity, maxPopularity]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth / 2; // container genişliği kadar kaydır
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -width, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: width, behavior: "smooth" });
      }
    }
  };


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

      <FilterBar />

      <div>
        {products.length > 0 ? (
          <div className="productsContainer">

            <button className="scrollBtn left" onClick={() => scroll("left")}>‹</button>

            <div className="productsInfos" ref={scrollRef}>
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

                    <div>
                      <StarRating rating={product.popularityScore * 5} />
                      <span> {(product.popularityScore * 5).toFixed(2)}/5 </span>
                    </div>
                    
                  </div>
                );
              })}
            </div>
            
            <button className="scrollBtn right" onClick={() => scroll("right")}>›</button>
          </div>
        ) : (
          <p>Yükleniyor...</p>
        )}
        </div>
      
    </div>
  );
}

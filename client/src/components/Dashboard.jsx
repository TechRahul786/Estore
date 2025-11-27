import { useState, useEffect } from "react";
import Swaper from "./Swaper";
import { useOutletContext } from "react-router-dom";
const images = [
  "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/d77989fef0a9a01b.jpeg?q=60",
  "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/3d1705990c27075f.jpeg?q=60",
  "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/4b94beb9a0289b17.jpeg?q=60",
];

 const data = [
    {
      imgurl:
        "https://rukminim2.flixcart.com/image/240/240/xif0q/monitor/u/m/b/-original-imah8rcwxbyk3nft.jpeg?q=60",
        productname:"monitor 1080p Full HD",
        price:"Rs2578"
    },
    {
      imgurl:
        "https://rukminim2.flixcart.com/image/240/240/xif0q/monitor/u/m/b/-original-imah8rcwxbyk3nft.jpeg?q=60",
         productname:"monitor 1080p Full HD",
         price:"Rs2578"
    },
    {
      imgurl:
        "https://rukminim2.flixcart.com/image/240/240/xif0q/monitor/u/m/b/-original-imah8rcwxbyk3nft.jpeg?q=60",
         productname:"monitor 1080p Full HD",
         price:"Rs2578"
    },
    {
      imgurl:
        "https://rukminim2.flixcart.com/image/240/240/xif0q/monitor/u/m/b/-original-imah8rcwxbyk3nft.jpeg?q=60",
         productname:"monitor 1080p Full HD",
         price:"Rs2578"
    },
  ];

const Dashboard = () => {

  const [current, setCurrent] = useState(0);

  const {products} =  useOutletContext();

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="relative w-full max-w-[1900px] mx-auto 
                h-[220px] sm:h-[280px] md:h-[350px] lg:h-[400px] 
                overflow-hidden shadow-lg">

  {/* Background Image */}
  <div
    className="w-full h-full bg-center bg-cover transition-all duration-700 ease-in-out"
    style={{
      backgroundImage: `url(${images[current]})`,
    }}
  ></div>

  {/* Prev Button */}
  <button
    onClick={prevSlide}
    className="absolute top-1/2 left-3 -translate-y-1/2 
              bg-black/40 hover:bg-black/70 text-white p-2 rounded-full"
  >
    ❮
  </button>

  {/* Next Button */}
  <button
    onClick={nextSlide}
    className="absolute top-1/2 right-3 -translate-y-1/2 
              bg-black/40 hover:bg-black/70 text-white p-2 rounded-full"
  >
    ❯
  </button>

  {/* Dots */}
  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
    {images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrent(index)}
        className={`h-2.5 w-2.5 rounded-full transition-all ${
          index === current ? "bg-white w-4" : "bg-gray-400"
        }`}
      />
    ))}
  </div>
</div>


      <Swaper products={products} headName={"Top Deals"}/>

      <Swaper products={products} headName={"Top Products for you"}/>
    </div>
  );
};

export default Dashboard;

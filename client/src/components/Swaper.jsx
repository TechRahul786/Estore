import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Swaper = ({ products = [], headName = "Products" }) => {

  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null); // holds swiper instance

  // Re-bind navigation once refs + swiper instance are available
  useEffect(() => {
    const swiper = swiperRef.current;
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;

    if (!swiper || !prevEl || !nextEl) return;

    // assign DOM nodes to swiper navigation params
    swiper.params.navigation.prevEl = prevEl;
    swiper.params.navigation.nextEl = nextEl;

    // destroy / init to make sure events are attached to new elements
    if (swiper.navigation) {
      try {
        swiper.navigation.destroy(); // safe to call
      } catch (e) {
        // ignore
      }
    }

    swiper.navigation.init();
    swiper.navigation.update();

    // cleanup on unmount
    return () => {
      if (swiper.navigation) {
        try {
          swiper.navigation.destroy();
        } catch (e) {}
      }
    };
  }, []); // run once after mount

  return (
    <div className="shadow-lg mt-2 p-5 bg-white relative">
      <p className="text-2xl font-semibold mt-1 mb-4">{headName}</p>

      <Swiper
        onSwiper={(s) => (swiperRef.current = s)} // store instance
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5  },
        }}
      >
        {products.slice(60,70).map((Item, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col mt-2 gap-1 justify-center items-center"
              onClick={()=>navigate(`/products/${Item.id}`,{state:{Item}})}
            >
              <img
                src={Item.thumbnail}
                alt={`slide-${index}`}
                className="size-36"
              />
              <p className="text-md text-gray-900">{Item.title}</p>
              <p className="text-md font-bold"><span>&#8377;</span>{Item.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* nav buttons must be siblings of Swiper and visible/clickable */}
      <button
        ref={prevRef}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-black hover:text-white z-20 pointer-events-auto"
        aria-label="Previous"
      >
        ◀
      </button>

      <button
        ref={nextRef}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-black hover:text-white z-20 pointer-events-auto"
        aria-label="Next"
      >
        ▶
      </button>
    </div>
  );
};

export default Swaper;

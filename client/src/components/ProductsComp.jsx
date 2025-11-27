import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductsComp = ({ finalProducts = [] }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate()

  const pageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(finalProducts.length / 10) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Prevent rendering empty items */}
      {finalProducts.length === 0 && <p>No products found</p>}
     
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-2">
        {finalProducts
          .slice(page * 10 - 10, page * 10)
          .map((Item, index) => (
            <div className="shadow-md p-2 rounded-lg md:shadow-lg md:p-5" key={index} onClick={()=>navigate(`/products/${Item.id}`,{state:{Item}})}>
              <img src={Item.thumbnail} alt={Item.title} />
              <p className="hover:text-blue-600 text-xs md:text-lg">{Item.title}</p>

              <div className="flex gap-0.5 justify-center items-center bg-green-600 w-fit p-1 mt-1 rounded-md text-sm">
                <p>{Item.rating}</p>
                <FaStar className="text-white" />
              </div>

              <div className="mt-2">
                <span>&#8377;</span>
                <span className="font-bold ml-1 text-md">{Item.price}</span>
              </div>
            </div>         
          ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-1 justify-center text-xs items-center mt-5 md:gap-2 md:text-lg">
        <p
          onClick={() => pageHandler(page - 1)}
          className={`cursor-pointer text-blue-700 text-md font-semibold ${
            page <= 1 ? "hidden" : ""
          }`}
        >
          Previous
        </p>

        {[...Array(Math.ceil(finalProducts.length / 10))].map((_, index) => (
          <p
            key={index}
            onClick={() => pageHandler(index + 1)}
            className={`p-2 cursor-pointer ${
              page === index + 1 ? "bg-blue-700 text-white rounded-full" : ""
            }`}
          >
            {index + 1}
          </p>
        ))}

        <p
          onClick={() => pageHandler(page + 1)}
          className={`cursor-pointer text-blue-700 text-md font-semibold ${
            page >= Math.ceil(finalProducts.length / 10) ? "hidden" : ""
          }`}
        >
          Next
        </p>
      </div>
    </div>
  );
};

export default ProductsComp;


import Filter from "../components/Filter";
import ProductsComp from "../components/ProductsComp";
import { useOutletContext } from "react-router-dom";

const Products = () => {
 
   const {finalProducts}  =  useOutletContext();

  return (
    <div className="flex gap-2">
      <div className="w-2/6 h-auto bg-white p-2 shadow-md md:w-1/6 md:p-5 md:shadow-xl">
      <Filter />
      </div>
      <div className="w-4/6 bg-white p-2 shadow-xl md:p-5 md:w-full">
        {finalProducts.length > 0 ? (
          <ProductsComp finalProducts={finalProducts} />
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Products;

import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addCart} from "../store/cartSlice";

const productDetails = () => {
  const product = useLocation().state.Item;
  const original = product.price;
  const discount = product.discountPercentage;

  const netDisacount = ( original * discount ) / 100
  
                                                                                                         


  const finalPrice = (original - (original * discount) / 100).toFixed(2);
  
  const dispatch =  useDispatch();
  const navigate = useNavigate()

  const handleCart = (data) =>{
    const product = JSON.parse(JSON.stringify(data))
    dispatch(addCart({data:product,discount:netDisacount,finalPrice:finalPrice}))
    navigate("/cart")
  }



  return (
    <div className="flex flex-col gap-2 md:flex-row md:mx-5 md:gap-5">
      <div className="w-fu md:w-1/3">
        <div className="border-1 border-gray-300 flex justify-center">
          <img src={product.thumbnail} alt="" />
        </div>

        <div className="mt-2 text-white font-bold text-sm grid grid-cols-2 gap-2">
          <div className="flex justify-center items-center gap-2 bg-amber-400 p-3 md:mt-0 md:p-4" onClick={()=>handleCart(product)}>
            <FaShoppingCart className="size-5 md:size-5" />
            <p>ADD TO CART</p>
          </div>

          <div className="flex justify-center items-center gap-2 bg-amber-500 p-3  md:mt-0 ">
            <FaBoltLightning className="size-5 md:size-5" />
            <p>BUY NOW</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:w-2/3">
        <p className="font-semibold text-lg">{product.title}</p>

        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 justify-center items-center bg-green-600 w-fit p-1 mt-1 rounded-md text-sm">
            <p>{product.rating}</p>
            <FaStar className="text-white" />
          </div>
          <p className=" font-semibold text-gray-400">
            {product.reviews.length} Reviews
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-green-600 font-semibold">Special price</p>
          <div className="flex gap-2">
            <p className="text-xl font-bold">
              <span>&#8377;</span>
              {finalPrice}
            </p>

            <p className="line-through text-gray-500">₹{original}</p>
            <p className="text-green-600 font-semibold">{discount}% off</p>
          </div>
        </div>

        <p className="text-red-500 mt-2">Hurry, Only {product.stock} left!</p>

        <div className="flex items-center gap-2 mt-2">
          <p className="bg-blue-900 text-white p-1 text-sm font-semibold rounded-md text-nowrap h-fit">
            {product.brand}
          </p>
          <p className="text-sm">
            {product.warrantyInformation} from the date of purchase.
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <p className="bg-blue-900 text-white p-1 text-sm font-semibold rounded-md text-nowrap h-fit">
            Return Policy
          </p>
          <p className="text-sm">{product.returnPolicy}</p>
        </div>

        <div className="flex gap-2 mt-2">
          <p className="bg-blue-900 text-white p-1 text-sm font-semibold rounded-md w-fit h-fit">
            Description
          </p>
          <p className="text-sm">{product.description}</p>
        </div>

        <div className="border-1 border-gray-300 p-1 mt-2 md:p-3">
          <p>Ratings & Reviews</p>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 justify-center items-center bg-green-600 w-fit p-1 mt-1 rounded-md text-sm">
              <p>{product.rating}</p>
              <FaStar className="text-white" />
            </div>
            <p className=" font-semibold text-gray-400">
              {product.reviews.length} Reviews
            </p>
          </div>
          {product.reviews.map((item, index) => (
            <div className="flex flex-col border-1 border-gray-300  p-1 mt-2 md:p-3">
            <div className="flex items-center gap-2 text-sm ">
              <div className="flex gap-0.5 justify-center items-center bg-green-600 w-fit p-1 mt-1 rounded-md text-sm">
                <p>{item.rating}</p>
                <FaStar className="text-white" />
              </div>
              <p className="font-semibold text-black text-nowrap">
                {item.comment}
              </p>
            </div>

            <div className="flex justify-between text-gray-500 text-sm font-semibold mt-3 md:justify-start md:gap-3">
                <p>{item.reviewerName}</p>
                <p>{item.date.slice(0,10)}</p>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default productDetails;

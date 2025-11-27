import { useDispatch, useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import {
  decreaseQty,
  deleteCartItem,
  emptyCart,
  increaseQty,
} from "../store/cartSlice";
import { MdDelete } from "react-icons/md";
import shopping from "../assets/images/shopping.png";
import { useNavigate } from "react-router-dom";

const ShowCart = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const data = useSelector((state) => state.cartState.cart);
  const dispatch = useDispatch();
  let final = 0;
  let finalDiscount = 0;

  data.forEach((element) => {
    final += element.price * element.quantity;
    finalDiscount += element.discount * element.quantity;
  });

  const totalAmmount = final - finalDiscount;
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen">
        {data.length === 0 ? (
          <div className="flex flex-col gap-5 justify-center items-center bg-white shadow-md md:mx-20 my-5 p-5">
            <img src={shopping} alt="empty cart" className="size-50" />
            {isAuthenticated ? (
              <>
                <p className="font-semibold">Your cart is empty!</p>
                <p className="text-xs font-light">Add items to it now.</p>
                <p
                  className="bg-blue-500 p-3 cursor-pointer text-sm md:mt-0 md:p-3 md:w-fit md:px-10 text-white shadow-md"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Shop now
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold">Missing Cart items?</p>
                <p className="text-xs font-light">
                  Login to see the items you added previously
                </p>
                <p
                  className="bg-amber-500 p-3 cursor-pointer text-sm md:mt-0 md:p-3 md:w-fit md:px-10 text-white shadow-md"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 md:mx-20 my-5 h-screen ">
            <div className="md:w-2/3">
              {data.map((item) => (
                <div className="flex gap-2 justify-between border-1 border-gray-300  bg-white shadow-lg mt-2 p-5">
                  <div className="flex items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="size-26"
                    />
                    <div className="">
                      <p className="text-md font-bold">{item.title}</p>
                      <div className="flex flex-row gap-2 items-center">
                        <p className="text-gray-400 line-through">
                          ₹{item.price}
                        </p>
                        <p className="text-xl">₹{item.finalPrice}</p>
                      </div>

                      <div className="flex gap-2">
                        <p
                          className="flex justify-center items-center border-1 border-black rounded-full px-1"
                          onClick={() => dispatch(decreaseQty(item.id))}
                        >
                          <RiSubtractFill />
                        </p>
                        <p className="flex justify-center items-center border-1 border-black  py-1 px-3">
                          {item.quantity}
                        </p>
                        <p
                          className="flex justify-center items-center border-1 border-black rounded-full px-1"
                          onClick={() => dispatch(increaseQty(item.id))}
                        >
                          <IoAdd />
                        </p>
                      </div>
                    </div>
                  </div>

                  <MdDelete
                    className="size-6 text-red-700"
                    onClick={() => dispatch(deleteCartItem(item.id))}
                  />
                </div>
              ))}
            </div>

            <div className="md:w-1/3 shadow-lg bg-white  mt-2 h-fit">
              <p className="border-b-1 border-gray-300 p-5">Price Details</p>

              <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between">
                  <p>Price{`(${data.length} items)`}</p>
                  <p>₹{final.toFixed(2)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Discount</p>
                  <p className="text-green-600">-₹{finalDiscount.toFixed(2)}</p>
                </div>

                <div className="flex justify-between border-y-1 border-dashed border-y-gray-300 py-4">
                  <p className="font-bold">Total Ammount</p>
                  <p className="font-bold">₹{totalAmmount.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-5 flexitems-center ">
                  <p className="bg-amber-500 p-3 text-sm  md:mt-0 md:p-3 md:w-fit md:px-5 text-white shadow-md">
                    PLACE ORDER
                  </p>
                  <p
                    className="font-bold hover:text-blue-900 text-sm cursor-pointer"
                    onClick={() => {
                      dispatch(emptyCart());
                    }}
                  >
                    EMPTY CART
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowCart;

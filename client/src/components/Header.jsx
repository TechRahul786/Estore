import { MdOutlineShoppingCart } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdOutlineExpandMore } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { linkActive, profileMenuActive } from "../store/navSlice";
import {  Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ user = null, isAuthenticated, products }) => {
  const cartIsActive = useSelector((state) => state.navController.cart);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartState.cart);
  const profileMenu = useSelector((state) => state.navController.profileMenu);
  const navigate = useNavigate();
  const [search,setSearch] = useState([])
  const [value,setValue] = useState("")

  const handlNavmenu = () => {
    dispatch(linkActive());
  };

  const handleSearch = (e) => {
    const text = e.target.value
    setValue(text)
     const filteredProducts = text.trim() === ""
  ? []
  : products.filter((item) =>                                         
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setSearch(filteredProducts)
     
  };

  useEffect(()=>{
      const handleClick = () =>{
        setSearch([])
       setValue('')
      }
      window.addEventListener("click",handleClick)
      return ()=> window.removeEventListener("click",handleClick)
  },[])
                                                                     

  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <Link to={"/"}>
          <p className="text-xl text-black/70 font-semibold md:text-3xl">
            EStore
          </p>
        </Link>
      </div>

      <div className="hidden md:flex bg-gray-300 w-1/3 rounded-3xl p-1 items-center">
        <input
          type="text"
          placeholder="Search for any Products or brand"
          className="w-full h-full pl-5 border-none focus:outline-none"
          value={value}
          onChange={(e) => handleSearch(e)}
        />
        <IoIosSearch className="size-7 bg-blue-900 text-white rounded-full p-0.5" />

        
        <div className="absolute top-13 z-[999] bg-gray-200 w-1/3">
          {search.slice(0,8).map((Item, index) => (
            <>
              <div className="flex items-center gap-2 p-2 border-b-1 border-gray-400" key={index} onClick={()=>navigate(`/products/${Item.id}`,{state:{Item}})}>
                <img src={Item.thumbnail} alt={Item.title} className="size-15" />
                <div className="font-semibold"><p className="text-black">{Item.title}</p>
                    <p className="text-gray-600 text-sm">₹{Item.price}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>


      <div className="flex md:flex-row gap-5">
        <div className="hidden md:flex gap-1 items-center">
          <IoLocationOutline className="size-6" />

          <p className="text-md">{user?.address?.address ?? "xxxxxxx"}</p>
        </div>

        <div
          className="hidden md:flex gap-1 items-center"
          onClick={() => navigate("/cart")}
        >
          <div className="relative">
            <MdOutlineShoppingCart className="size-6" />

            <span className="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-2 left-[60%]">
              {cart !== null ? cart.length : ""}
            </span>
          </div>

          <p className="text-md">Cart</p>
        </div>

        <div className="flex gap-1 items-center">
          {user !== null ? (
            <img src={user?.image} alt="" className="size-7" />
          ) : (
            <RiAccountCircleFill className="size-6" />
          )}

          <div className="flex text-md">
            <span>
              {user !== null ? (
                `${user?.firstName}`
              ) : (
                <p onClick={() => navigate("/auth")} className="cursor-pointer">
                  SignIn
                </p>
              )}
            </span>
            {isAuthenticated ? (
              <MdOutlineExpandMore
                className={`${profileMenu ? "" : "rotate-180"} size-6`}
                onClick={() => dispatch(profileMenuActive())}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {cartIsActive ? (
          ""
        ) : (
          <div className="md:hidden">
            <RxHamburgerMenu onClick={() => handlNavmenu()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

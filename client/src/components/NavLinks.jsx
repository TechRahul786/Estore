import { TbCategory } from "react-icons/tb";
import { IoGiftOutline } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { allcategory } from "../store/navSlice";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { logout } from "../store/authSlice";

const NavLinks = ({ categories, setselectedCategory,isAuthenticated }) => {
  const isActive = useSelector((state) => state.navController.mob);
  const category = useSelector((state) => state.navController.allcategory);
  const profileMenu = useSelector((state)=>(state.navController.profileMenu))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNav = (name) => {
    setselectedCategory(name);
    navigate("/products");
  };

  return (
    <>
      <div className="h-0.5 bg-gray-200"></div>
      <div className="md:flex flex-row justify-between ">
        <div className="flex flex-row gap-5">
          <div className="hidden md:flex gap-1 items-center">
            <TbCategory className="size-5" />
            <p className="text-md">All category</p>
            <MdOutlineExpandMore
              className={`${category ? "" : "rotate-180"} size-6`}
              onClick={() => dispatch(allcategory())}
            />
          </div>

          <div>
            <ul
              className={` ${
                isActive ? "flex flex-col" : "hidden"
              } md:flex md:flex-row gap-5 text-md text-gray-500`}
            >
              {categories.slice(0, 10).map((item, index) => (
                <li
                  key={item.name}
                  onClick={() => handleNav(item.name)}
                  className="cursor-pointer hover:underline"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
       {isAuthenticated && profileMenu?(<div className="flex flex-col gap-1 absolute right-0 top-17 z-[999] bg-white p-2 shadow-lg">
          <div className="flex justify-center  items-center gap-2 hover:bg-blue-900 p-3 rounded-md hover:text-white cursor-pointer">
            <CgProfile />
            <p>Profile</p>
          </div>
          <div className="flex justify-center  items-center gap-2 hover:bg-blue-900 p-3 rounded-md hover:text-white cursor-pointer" onClick={()=>{navigate("/orders")}}>
            <FaBox />
            <p>Orders</p>
          </div>
          <div onClick={()=>dispatch(logout())} className="flex justify-center  items-center gap-2 hover:bg-blue-900 p-3 rounded-md hover:text-white cursor-pointer">
            <LuLogOut />
            <p>Logout</p>
          </div>
        </div>):("")}
      
      </div>

      <div
        className={`${
          category
            ? "grid grid-cols-10 gap-y-2 gap-x-10 p-5 text-md text-gray-500"
            : "hidden"
        }`}
      >
        {categories.map((item, index) => (
          <p className="cursor-pointer" key={item.name}>{item.name}</p>
        ))}
      </div>
    </>
  );
};

export default NavLinks;

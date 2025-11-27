import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { cartActive } from "../store/navSlice";
import { useEffect } from "react";


const Cart = () =>{

   const dispatch =  useDispatch();
    useEffect(() => {
    dispatch(cartActive(true));
  }, []);
    
    return (<div className="p-3">
        <Outlet/>
    </div>)
}

export default Cart;
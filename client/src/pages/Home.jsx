import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavLinks from "../components/NavLinks";
import Footer from "../components/Footer";

import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} from "../store/service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActive } from "../store/navSlice";
import { useGetUserProfileQuery } from "../store/authApi";
const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { data, status } = useGetUserProfileQuery();
  let user = data;

  if (!isAuthenticated) {
    user = null;
  }

  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(cartActive(false));
  }, []);
  
  const [selectedCategory, setselectedCategory] = useState("");

  const { data: products = [], isLoading } = useGetProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: categoryProducts = [] } = useGetProductsByCategoryQuery(
    selectedCategory.replaceAll(" ", "-")
  );

  const finalProducts = selectedCategory ? categoryProducts : products;
  if (status === "pending") return <p>isLoding......</p>;
  if (isLoading) return <p>isLoding......</p>;

  return (
    <>
      <div className="flex flex-col p-3 h-full md:gap-5">
        <Header
          user={user}
          isAuthenticated={isAuthenticated}
          products={products}
        />
        {/* navigation */}
        <NavLinks
          categories={categories}
          setselectedCategory={setselectedCategory}
          isAuthenticated={isAuthenticated}
        />
        <Outlet
          context={{
            user,
            products,
            finalProducts,
            categories,
            selectedCategory,
            setselectedCategory,
            isAuthenticated,
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;

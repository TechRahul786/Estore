import { Slider } from "@mui/material";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
const Filter = () => {
   const {categories,selectedCategory="",setselectedCategory} = useOutletContext();
 
  const [range, setRange] = useState([100, 10000]);

  const HandleFilter = (name) =>{
    setselectedCategory(name)
  }
  return (
    <div className="">
      <p className="py-2 border-b-2 font-bold border-b-gray-100 md:py-5">Filter</p>
      <div className="">
        <p className="pt-5">CATEGORIES</p>
        <ul className="flex flex-col gap-2 mt-2">
          {categories.map((items, index) => (
            <div className="flex flex-row gap-1 md:gap-2" key={index}>
              <input type="radio" name="category" id={index} onClick={()=>HandleFilter(items.name)} checked={selectedCategory === items.name}/>
              <li key={index} className="text-sm md:text-md">{items.name}</li>
            </div>
          ))}
        </ul>
      </div>

      <div>
        <p className="pt-5">PRICE</p>

        <p className="text-lg font-semibold mb-3">Price Range</p>
        <Slider
          value={range}
          onChange={(e, newValue) => setRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
        />
        <p className="mt-2">
         Min ₹{range[0]} - Max ₹{range[1]}
        </p>
      </div>
    </div>
  );
};

export default Filter;

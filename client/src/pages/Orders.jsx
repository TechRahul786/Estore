import { IoIosSearch } from "react-icons/io";
const Orders = () =>{
    return (
        <div className="flex flex-col justify-center items-center md:mx-20 my-5 p-5">
            <div className="md:flex items-center w-full">
                    <input
                      type="text"
                      placeholder="Search You orders here"
                      className="w-full h-full border-1 border-gray-400 focus:outline-none bg-white p-3"
                    
                    />
                    <div className="flex gap-1 items-center bg-blue-900 text-white p-3">
                        <IoIosSearch className="size-5" />
                        <p>Search</p>
                    </div>
                    
            </div>
        </div>
    )
}

export default Orders
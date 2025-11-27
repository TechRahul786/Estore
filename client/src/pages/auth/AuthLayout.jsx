
import loginimg from "../../../public/logo.png"
import FormLayout from "../../components/FormLayout"
import { useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from "../../store/authApi"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
const AuthLayout = () =>{
    const [formtype,setFormType] = useState("login")
    const [loginUser,{isLoding}] = useLoginUserMutation();
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();    
    const navigate = useNavigate()
    
    
    const handleForm =  async (formdata) =>{
        
        if(formtype === "login"){
            
            try {
                await loginUser(formdata).unwrap()
                navigate("/")
            } catch (error) {
                 
            }
        }else{
            
            try {
                await registerUser(formdata).unwrap()
                navigate("/auth")
            } catch (error) {
               
            }
        }
        

    }
    
    return (
        <div className="py-20 p-5 w-screen h-screen overflow-hidden bg-gray-200 md:px-30 md:h-screen">
        <div className="md:flex w-full h-fit shadow-xl bg-white md:h-full">
                <div className="bg-white h-fit rounded-t-2xl  flex flex-col md:h-full md:rounded-none justify-center items-center md:w-2/4">
                    <img src={loginimg} alt="login" className="size-38 md:size-46 "/>
                    <p className="mt-3 mb-2 text-xl text-black md:mt-6">{formtype.toUpperCase()}</p>
                    <p className="text-sm font-semibold">{formtype === "login"? ("Log in and explore your favorite products"):("Join us and start your shopping journey")}</p>
                </div>
                <div className="w-full h-fit flex justify-center items-center md:h-full md:w-2/4">
                    <FormLayout formtype={formtype} setFormType={setFormType} handleForm={handleForm}/>
                </div>
        </div>
        </div>
    )
}

export default AuthLayout

import loginimg from "../../assets/images/loginrm.png"
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
                  console.log("Login failed:", err);
            }
        }else{
            
            try {
                await registerUser(formdata).unwrap()
                navigate("/auth")
            } catch (error) {
                console.log(error)
            }
        }
        

    }
    
    return (
        <div className="py-20 p-5 w-screen overflow-hidden bg-gray-200 md:px-30 md:h-screen">
        <div className="md:flex w-full h-full shadow-2xl bg-white">
                <div className="bg-blue-950 h-fit rounded-t-2xl  flex flex-col md:h-full md:rounded-none justify-center items-center md:w-2/4">
                    <img src={loginimg} alt="login" className="size-38 md:size-46 "/>
                    <p className="mt-3 mb-2 text-xl text-white md:mt-6">{formtype.toUpperCase()}</p>
                    <p></p>
                </div>
                <div className="w-full flex justify-center items-center md:h-full md:w-2/4">
                    <FormLayout formtype={formtype} setFormType={setFormType} handleForm={handleForm}/>
                </div>
        </div>
        </div>
    )
}

export default AuthLayout
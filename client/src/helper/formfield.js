const formData = {
  login: [
  
    { name: "username", label: "username", placeholder: "Enter your username", type: "text" },
    { name: "password", label: "Password", placeholder: "Enter your Password", type: "password" },
  ],

  register: [
   
    { name: "name", label: "Name", placeholder: "Enter your Name", type: "text" },
    { name: "email", label: "Email", placeholder: "Enter your Email", type: "text" },
    { name: "address", label: "Address", placeholder: "Enter your Address", type: "text" },
    { name: "pinCode", label: "Pin Code", placeholder: "Enter your Pin Code", type: "text" },
    { name: "password", label: "password", placeholder: "Enter your Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm Password", type: "password" },
  ],
};

export default formData;
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash} from "react-icons/fa6"


const UserAuthInput = ({label,placeholder,isPass,setStateFunction,Icon,setValidation}) => {
    const [value,setValue] = useState("");
    const [showPass,setShowPass] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    


    const handleTextChange = (e) => {
        e.preventDefault();
        setStateFunction(e.target.value);
        setValue(e.target.value);
        if (placeholder === "Email"){
            const emailRegex = /^[^\s@]+@[^\s@]+[^\s@]+$/;
            const status = emailRegex.test(value);
            setIsEmailValid(status);
            setValidation=(status);

        }

    }
  return (
    <div className="flex flex-col items-start justify-start gap-1">
        <label className="text-sm text-gray-300">{label}</label>
        <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
          !isEmailValid && placeholder === "Email" && 
          value.length > 0 && "border-2 border-red-500"
        }`}>
            <Icon className="text-text555 text-2xl" />
            <input 
            type={isPass && showPass ? 'password' : "text"}
            placeholder={placeholder}
            className="flex-1 h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
            value={value}
            onChange={handleTextChange}
            />
           {isPass && (
             <motion.div
             onClick={() => setShowPass(!showPass)}
             while={{scale: 0.9}} className="cursor-pointer">
             {showPass ? (
                <FaEye className="text-text555 text-2xl" />
             ): (
                <FaEyeSlash className="text-text555 text-2xl " />
             )}
         </motion.div>
           )}
        </div>
    </div>
  )
}

export default UserAuthInput
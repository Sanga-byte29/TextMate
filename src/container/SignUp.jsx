import { useState } from "react";
import Logo from "../assets/Logo.png";
import UserAuthInput from "../components/UserAuthInput";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { signINWithGitHub, signINWithGoogle } from "../utils/helpers";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animation";



const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation ] = useState(false);
  const [isLogin, setIsLogin] = useState([]);
  const [alert,setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const createNewUser  = async () => {
    if(validation){
      await createUserWithEmailAndPassword(auth, email,password).then(userCred => {
        if(userCred){
          console.log(userCred);
        }
      }).catch((err) => console.error(err));
    }
  }
  const loginWithEmailPassword = async () => {
    if( validation){
      await signInWithEmailAndPassword(auth,email,password)
      .then((userCred) => {
        if (userCred) {
          console.log(userCred);
        }
      })
      .catch((err) => {
        console.log(err.message);
        if(err.message.includes("user-not-found")){
          setAlert(true);
          setAlertMessage("Invalid Id: user not found")
        }
        else if(err.message.includes("wrong-password")){
          setAlert(true)
          setAlertMessage("Password Mismatch")
        }
        else{
          setAlert(true)
          setAlertMessage("Something went wrong! Try again later.")

        }
        setInterval(() => {
          setAlert(false);
        },4000);
      });
    }
  }
 
  return (
    <div className="w-full py-6">
        <img src={Logo} alt="Logo" width={60} height={60} />
                <div style={{display: "flex",flexDirection: "column",position: "relative"}}>
                <h1 style={{position: 'relative', color:"white"}}>TextMate</h1>           
                </div>
        <div className="w-full flex flex-col items-center justify-center py-8">
            <p className="py-12 text-2xl text-primaryText">Join with Us! </p>
            <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
                {/* email */}
                <UserAuthInput 
                label="Email" 
                placeholder="Email" 
                isPass={false} 
                key="Email" 
                setStateFunction={setEmail} 
                Icon={FaEnvelope} 
                setValidation={setValidation}
                />
                {/* password */}
                <UserAuthInput 
                label="Password" 
                placeholder="Password" 
                isPass={true} 
                key="Password" 
                setStateFunction={setPassword} 
                Icon={MdPassword} />

                {/* alert section */}
                <AnimatePresence>
                    {alert && (
                      <motion.p 
                      key={"Alert Message"}
                      {...fadeInOut}
                      className="text-red-500">
                        {alertMessage}
      
                      </motion.p>
                    )}
                </AnimatePresence>
                {/* login button */}

                {/* account text section */}

                {isLogin ? (
                   <motion.div 
                   onClick={createNewUser}
                   whileTap={{scale: 0.9}} className="flex item-center justify-center w-full py-3  rounded-xl text-white text-lg hover:bg-emerald-400 cursor-pointer bg-emerald-500">
                   <p className="text-xl text-white">Sign Up</p>
               </motion.div>
                )
                : (
                  <motion.div 
                  onClick={loginWithEmailPassword}

                  whileTap={{scale: 0.9}} className="flex item-center justify-center w-full py-3  rounded-xl text-white text-lg hover:bg-emerald-400 cursor-pointer bg-emerald-500">
                    <p className="text-xl text-white">Login</p>
                </motion.div>
                )
              }
                {isLogin ? (
                  <p onClick={() => setIsLogin(!isLogin)} className="text-sm text-primaryText flex item-center justify-center gap-3">
                  Already have an account !{" "} <span className="cursor-pointer text-emerald-500">Login Here</span>
                </p>
                ): (
                  <p onClick={() => setIsLogin(!isLogin)}  className="text-sm text-primaryText flex item-center justify-center gap-3">
                  Does not have an account !{" "} <span className="cursor-pointer text-emerald-500">Create Here</span>
                </p>
                )}
                {/* or section */}
                <div className="flex items-center justify-center gap-12">
                  <div className="h-[1px] bg-[rgba(256,265,256,0.2)] rounded-md w-24">
                  </div>

                    <p className="text-sm text-[rgba(256,265,256,0.2)]">OR</p>
                    <div className="h-[1px] bg-[rgba(256,265,256,0.2)] rounded-md w-24"></div>
                </div>
                {/* sign in with google */}
                  <motion.div 
                  onClick={signINWithGoogle}
                  className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.4)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer" whileTap={{scale: 0.9}}>
                    <FaGoogle className = "text-3xl" />
                    <p>Sign in with Google</p>
                  </motion.div>
                {/* or section */}
                <div className="flex items-center justify-center gap-12">
                  <div className="h-[1px] bg-[rgba(256,265,256,0.2)] rounded-md w-24">
                  </div>

                    <p className="text-sm text-[rgba(256,265,256,0.2)]">OR</p>
                    <div className="h-[1px] bg-[rgba(256,265,256,0.2)] rounded-md w-24"></div>
                </div>
                {/* sign in with github */}
                <motion.div
                onClick={signINWithGitHub}
                className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.4)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer" whileTap={{scale: 0.9}}>
                    <FaGithub className = "text-3xl" />
                    <p>Sign in with Github</p>
                  </motion.div>

            </div>
        </div>
    </div>
  )
}

export default SignUp
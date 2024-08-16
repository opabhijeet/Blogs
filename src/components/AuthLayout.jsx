import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function AuthLayout({ children, authenticated }) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state)=>state.auth.status);

    useEffect(()=>{
        if(authenticated && authenticated !== authStatus){
            navigate('/login');
        }
        else if(!authenticated && authenticated !== authStatus){
            navigate('/');
        }
        setLoader(false); 
    },[authStatus, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
export default AuthLayout;
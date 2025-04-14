import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

    const checkUserAuth = async()=>{
        try{
            const res = await fetch("http://localhost:3000/user/check-auth",{
                method:"GET",
                credentials:"include",
            });
            
            if(!res.ok) {
                console.log("token not found")

                return
            }
            
         const data = await res.json();
         setuser(data.user);
        
        }catch(error){
            setuser(null)
        }finally{
            setloading(false);
        }
    }

    useEffect(() => {
      checkUserAuth();
    }, [])
    

    return(
        <>
        <AuthContext.Provider value={{user,setuser,checkUserAuth}}>
            {children}
        </AuthContext.Provider>
        </>
    )

}



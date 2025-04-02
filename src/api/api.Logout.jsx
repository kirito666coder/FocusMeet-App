import { API_URL } from "./apiconfig";

export const logoutapi = async ()=>{
    const respons = await fetch(`${API_URL}/user/logout`,{
        method:"POST",
        credentials:"include",
        
    })
}
import { data } from "react-router-dom";
import { API_URL } from "./apiconfig";

export const followuser = async (followid)=>{
    const response = await fetch(`${API_URL}/follow/followuser/${followid}`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",    
    })
    return response.json()
}

export const unfollowuser = async (followid)=>{
    const response = await fetch(`${API_URL}/follow/unfollowuser/${followid}`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
    })
    return response.json()
}

export const getfollowedusers = async ()=>{
    const response = await fetch(`${API_URL}/follow/get-followed-user`,{
        method:"GET",
        credentials:"include",
    })
    return response.json();
}

export const getfollowedpost = async ()=>{
    const response = await fetch(`${API_URL}/follow/followed-posts`,{
        method:"GET",
        credentials:"include",
    })
    const data = await response.json();
    return data
}
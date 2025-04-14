import { API_URL } from "./apiconfig";

export const mostLikePost = async ()=>{
    const response = await fetch(`${API_URL}/post/most-like-post`,{
        method:"GET",
    })

    const data = await response.json();
    return data;
}
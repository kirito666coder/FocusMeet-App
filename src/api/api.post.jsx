import { API_URL } from "./apiconfig";


export const deleteuserpost = async (postid)=>{
    const response = await fetch(`${API_URL}/post/delete-post/${postid}`,{
        method:"DELETE",
    })

}

export const deleteusercoment = async (postid,commentid)=>{
    const response = await fetch(`${API_URL}/post/delete-comment/${postid}/${commentid}`,{
        method:"DELETE",
    })
}
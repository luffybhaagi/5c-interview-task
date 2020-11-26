export const host="https://beta.5cnetwork.com/"

export const signInPostOptions=(raw)=>{
    return {
        method:"POST",
        redirect:'follow',
        body:raw,
        headers:{
            "Content-Type":"application/json",
            Accept:'application/json'
        },
        credentials:'include'
    }
}

export const activeListPostOptions=()=>{
    return{
        method:"POST",
        redirect:'follow',
    }
}

export const getCaseStudyOptions=()=>{
    return {
        method:"GET",
        redirect:'follow'
    }
}

export const uploadDocOptions=(formData)=>{
    return {
        method:"POST",
        redirect:'follow',
        body:formData
    }
}
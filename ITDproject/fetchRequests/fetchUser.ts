import {getUrl, url} from "@/fetchRequests/config";

export default  async  function fetchUser(userName:string){
    try{
    const res= await fetch(`${url}/getUser`,{
        method: "POST", // oder "GET", je nachdem, was dein Server erwartet
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usrnam: userName,
        })
    })
    if(res.status === 200){
        return await res.json()
    }else{
        throw Error(`Unable to fetch user ${res.status}`)
    }
    }catch (e){
        console.log(e)
    }
};
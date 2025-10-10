import {url} from "@/fetchRequests/config";

export default  async  function fetchUser(email:string){
    try{
    const res= await fetch(`${url}/users`,{
        method: "POST", // oder "GET", je nachdem, was dein Server erwartet
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        })
    })
    if(res.status === 200){
        return res.json()
    }else{
        throw Error(`Unable to fetch user ${res.status}`)
    }
    }catch (e){
        console.log(e)
    }
};
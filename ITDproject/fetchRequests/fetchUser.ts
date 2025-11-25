import {checkUrl, getUrl, url} from "@/fetchRequests/config";

export default  async  function fetchUser(userName:string){
    console.log(checkUrl())
    try{
    const res= await fetch(`${checkUrl()}/getUser`,{
        method: "POST",
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

export async function fetchUserNames(userId: number) {
    try{
        const res= await fetch(`${checkUrl()}/getUserNames`,{
            method: "POST", // oder "GET", je nachdem, was dein Server erwartet
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                persnr: userId,
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
}
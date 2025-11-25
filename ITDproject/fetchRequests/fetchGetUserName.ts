import {checkUrl, url} from "@/fetchRequests/config";


export default async function fetchGetUserName(userId: string) {
    try{
        const res= await fetch(`${checkUrl()}/getUserNames`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                persnr: userId,
            })
        })
        if(res.status === 200){
            return await res.json()
        }else{
            throw Error(`Unable to fetch UserName ${res.status}`)
        }
    }catch (e){
        console.log(e)
    }
}
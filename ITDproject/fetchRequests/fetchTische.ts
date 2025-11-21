import { url } from "@/fetchRequests/config";

export async function fetchSetTable(){
    try{
        const res= await fetch(`${url}/insertTische`)
        if(res.status === 200){
            return await res.json()
        }else{
            throw Error(`Unable to fetch user ${res.status}`)
        }
    }catch (e){
        console.log(e)
    }
};

export async function fetchGetTisch(){
    try{
        const res= await fetch(`${url}/getTische`)
        if(res.status === 200){
            return await res.json()
        }else{
            throw Error(`Unable to fetch role ${res.status}`)
        }
    }catch (e){
        console.log(e)
    }
};

export async function fetchDelTisch (TischID: number){
    try{
        const res= await fetch(`${url}/delTisch`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                TischID: TischID,
            })
        })
        if(res.status === 200){
            return await res.json()
        }else{
            throw Error(`Unable to fetch role ${res.status}`)
        }
    }catch (e){
        console.log(e)
    }
    
}
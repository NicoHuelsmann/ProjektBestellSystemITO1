import {url} from "@/fetchRequests/config";

export default  async  function fetchRole(userId:number){
    try{
        const res= await fetch(`${url}/role`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
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
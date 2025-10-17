import {url} from "@/fetchRequests/config";

export default  async  function fetchSetCurrentOrder(orderId:any,data:{}){
    try{
        const res= await fetch(`${url}/setCurrentOrder`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                orderId:orderId,
                data:data
            })
        })
        if(res.status === 200){
            return await res.json()
        }else{
            throw Error(`Unable to Order by id ${orderId} role ${res.status}`)
        }
    }catch (e){
        console.log(e)
    }
};
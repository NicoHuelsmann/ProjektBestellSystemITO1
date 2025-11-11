import {getUrl} from "@/fetchRequests/config";

export default  async  function fetchClearOrder(orderId:any){
    try{
        const res= await fetch(`${getUrl()}/removeCurrentOrder`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                orderId:orderId,
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
import {checkUrl, getUrl} from "@/fetchRequests/config";

export default  async  function fetchGetCurrentOrder(orderId:any){
    try{
        const res= await fetch(`${checkUrl()}/getCurrentOrder`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                orderId: orderId,
            })
        })
        if(res.status === 200){
            if( await res.json() !== '')
            return await res.json()
        }else{
            throw Error(`Unable to fetch order ${res.status}`)
        }
    }catch (e:any){
        if(!e.message.includes('Failed to execute \'json\'')){
            console.log(e)
        }
    }
};
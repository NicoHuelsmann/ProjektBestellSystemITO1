import {getUrl,url} from "@/fetchRequests/config";

export default  async  function fetchSetCurrentOrder(orderId:any,data:{}, date:string,ready:boolean){
    try{
        console.log(getUrl().toString())
        const res= await fetch(`${getUrl() === ''? url:getUrl()}/setCurrentOrder`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                orderId:orderId,
                data:data,
                date:date,
                ready:ready
            })
        })
        if(res.status === 200){
            return await res.json()
        }else{
            throw Error(`Unable to Order by id ${orderId} fetchSetCurrentUser ${res.status}`)
        }
    }catch (e){
        console.log(e)
    }
};
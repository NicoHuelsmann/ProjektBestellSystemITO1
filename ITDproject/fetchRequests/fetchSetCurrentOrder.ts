import {getUrl} from "@/fetchRequests/config";

export default  async  function fetchSetCurrentOrder(orderId:any,data:{}, date:string){
    try{
        console.log(getUrl().toString())
        const res= await fetch(`${getUrl().toString()}/setCurrentOrder`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                orderId:orderId,
                data:data,
                date:date
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
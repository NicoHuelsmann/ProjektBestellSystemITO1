import {getUrl} from "@/fetchRequests/config";

export default  async  function fetchGetTisch(){
    try{
        const res= await fetch(`${getUrl()}/getTische`)
        if(res.status === 200){
            return await res.json()
        }else{
            throw Error(`Unable to fetch role ${res.status}`)
        }
    }catch (e){
        console.log(e)
    }
};
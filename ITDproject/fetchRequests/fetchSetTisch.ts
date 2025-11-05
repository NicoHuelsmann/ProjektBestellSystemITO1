import {url} from "@/fetchRequests/config";

export default  async  function fetchSetTable(){
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
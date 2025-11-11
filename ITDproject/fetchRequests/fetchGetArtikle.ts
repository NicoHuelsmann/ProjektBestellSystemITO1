import {url} from "@/fetchRequests/config";

export default  async  function fetchArtikle(){
    try{
        const res= await fetch(`${url}/getArtikel`)
        if(res.status === 200){
            return res.json()
        }else{
            throw Error(`Unable to fetch Artikel ${res.status}`)
        }
    }catch (e){
        console.log(e)
    }
};
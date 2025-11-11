import {getUrl} from "@/fetchRequests/config";

export default  async  function fetchArtikle(){
    try{
        console.log("Fetch Artikle");
        const res= await fetch(`${getUrl()}/insertArtikel`)
        if(res.status === 200){
            return res.json()
        }else{
            throw Error(`Unable to fetch Artikel ${res.status}`)
        }
    }catch (e){
        console.log(e)
    }
};
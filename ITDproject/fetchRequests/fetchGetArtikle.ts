import {checkUrl, getUrl, url} from "@/fetchRequests/config";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export default  async  function fetchArtikle(){

    try{
        if(await asyncStorage.getItem('user') === 'Koch'){
            const res= await fetch(`${checkUrl()}/getArtikel`)
            if(res.status === 200){
                return res.json()
            }else{
                throw Error(`Unable to fetch Artikel ${res.status}`)
            }
        }
        else{
            console.log(getUrl())
            const res= await fetch(`${checkUrl()}/getArtikel`)
            if(res.status === 200){
                return res.json()
            }else{
                throw Error(`Unable to fetch Artikel ${res.status}`)
            }
        }

    }catch (e){console.log(getUrl())
        console.log(e)
    }
};
import React, {useEffect} from "react";
import Wrapper from "@/app/Wrapper";
import {Text} from "react-native";
import fetchGetAllCurrentOrder from "@/fetchRequests/fetchGetAllCurrentOrder";


export default function Koch():React.JSX.Element{

    const getAllBestellungen = async () => {
        const orders = await fetchGetAllCurrentOrder()
        if(orders !== undefined) {
            console.log('geht')
        }
    }
    useEffect(()=>{
        const interval = setInterval(() =>{
            getAllBestellungen()
        },1000)
        return () => clearInterval(interval)
    })
return (
    <Wrapper>
        <Text>Koch</Text>
    </Wrapper>
)
}
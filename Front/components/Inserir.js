import React from "react";
import {View, Text, TextInput} from 'react-native';
import { useState } from "react";
import { Button } from "react-native-web";


const DadoInserir=()=>{
const [nome, setNome]=useState(null);

const DadoInserir=()=>{
    return(
        <View style={{
                border:'1px solid black',
                margin:3,
                padding:6    
                }}>
            <Text>Nome</Text>
            <TextInput 
                onChangeText={(text)=>{SetNome(text)}}
            />
            <Button 
                title="CADASTRAR"
                onPress={()=>{addUser()}}
            />
        </View>
    )
}
}
import React from "react";
import { View, Pressable, Text } from "react-native";

const DadosDeletado = (props) => {

    const Delete = (id) => {
        let url = `http://192.168.1.124:3000/delete/${id}`;
        console.log(url);
        fetch(url, {
          method: 'DELETE',
        }).then((response) => response.json())
          .then((json) => console.log(json));
          setCampo(prev => prev.filter(item => item._id !== id)); // remove do estado
      }

    return (
        <View>
            <Pressable style={{border:'1px solid black', padding:2, margin:5, width:'30%', alignItems:"center"}}
            
            onPress={()=>{ Delete(props.id)}}>
                <Text>excluir</Text>
            </Pressable>
        </View>

    )
}

export default DadosDeletado;
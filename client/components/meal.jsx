import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import Color from "@/constants/Color";


export default function meal({ data , onDlate}) {
  const delateMeal = ()=>{};
  let i
  return (
    <View style={style.parent}>
      <Text style={{color:Color.first,fontSize:20,fontWeight:'bold'}}>MEAL</Text>
      <View style={{ flexDirection:'row', justifyContent:'flex-end',gap:11, margin:5}}>
            <Text style={{color:Color.first}}>kcal</Text>
            <Text style={{color:Color.first}}>prot (g) </Text>
            <Text style={{color:Color.first}}>fats(g)</Text>
            <Text style={{color:Color.first}}>carb(g)</Text>
      </View>
      <View style={style.child}>
        <View>
          {data.foods.map((e) => (
            <Text style={{fontSize:15,color:Color.first,padding:5}}>{e}</Text>
          ))}
        </View>
        <View>
          <View style={{flexDirection:'row',backgroundColor:Color.first,gap:34,padding:7}}>
            <View style={{gap:9}}>
              {data.kcal.map((e) => (
                <Text style={{fontWeight:'bold'}}>{e}</Text>
              ))}
            </View>
            <View style={{gap:9}}>
              {data.protein.map((e) => (
                <Text style={{fontWeight:'bold'}}>{e}</Text>
              ))}
            </View>
            <View style={{gap:9}} >
              {data.fat.map((e) => (
                <Text style={{fontWeight:'bold'}}>{e}</Text>
              ))}
            </View>
            <View style={{gap:9}}>
              {data.carbs.map((e) => (
                <Text style={{fontWeight:'bold'}}>{e}</Text>
              ))}
            </View>
          </View>
        </View>
      </View>
      <Pressable onPress={delateMeal} style={{position:'absolute',top:5,right:10}}>
        <Text style={{color:'red',fontWeight:'900',fontSize:15}} onPress={(e)=>onDlate(data.id)}>X</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  parent: {
    backgroundColor: Color.second,
    margin: (50, 30),
    padding:15,
    borderRadius:10,
    position:'relative'
  },
  child:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
import React, { useContext, useState, useRef} from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { View, ScrollView,Text,Image } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/UserContext";

const Update = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

  
  

    return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.Container,
      ]}
      contentContainerStyle={{ flexGrow: 1 }}
      >
        
          <Text style={{
            color:activeColors.text,
            fontSize:32,
            alignSelf:'center',
            fontFamily:"Cochin",
            paddingTop:100
          }}>
            Update Screen
          </Text>
        
          
        


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  txt:{
    color:'blue',
    fontSize:20,
    textAlign:'center',
    marginTop:100
  }
});

export default Update;

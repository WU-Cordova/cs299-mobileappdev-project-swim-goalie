import React, { useContext, useState, useRef} from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { View, ScrollView,Text,Image } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/UserContext";
import { EventList, EventNames } from "../context/WorldRecords";
import { auth,db } from "../services/firebaseConfig";
import {Card} from "@rneui/base";
const Goals = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = colors[theme.mode];
    const [refreshing, setRefreshing] = useState(false);
    const {loggedInUser}= useAuth()
    const dataDict={}
    const userId = loggedInUser.uid;
    const user_doc=db.collection("users").doc(`${userId}`);
    const get_user_data = async(doc1)=>{doc1.get()
        .then(Snapshot=>{
          //console.log(Snapshot.data())
          const snap=Snapshot.data();
          for (x in EventList){
            const smallDict=dataDict
            dataDict[EventList[x]]=snap[EventList[x]]
            
          }
          console.log(dataDict)
        })}

    
        get_user_data(user_doc.collection('times').doc('goals'))
        
            
       
    
    const onRefresh = () => {
        setRefreshing(true);

        // Fetch new data here and update your state

        // After fetching the data, set refreshing to false
        setRefreshing(false);
    };
  
  

    return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      style={[
        {
          backgroundColor: activeColors.primary,
          alignContent:'left'
        },
        styles.Container,
      ]}
      contentContainerStyle={{ flexGrow: 1 }}
      >
        
          <Text style={styles.header}>
            Goal Views
          </Text>
          
          <Card style={{backgroundColor:activeColors.secondary,flexDirection:'right'}}>
            <Text style={styles.title}>
                {EventNames["Fr50"]}
            </Text>
            <Text style={styles.data}>
                {dataDict["Fr50"]}
            </Text>
            <Text style={styles.data}>
                FINASCORE
            </Text>
            
          </Card>
          
        


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  title:{
    color:activeColors.onSecondary,
    fontSize:32,
    fontFamily:"Cochin",
  },
  data:{
    color:activeColors.onSecondary,
    fontSize:24,
    fontFamily:"Cochin",
  },
  header:{
    color:activeColors.onSecondary,
    fontSize:50,
    fontFamily:"Cochin",
  },
});

export default Goals;

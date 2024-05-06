import React, { useContext, useState, useRef, useEffect} from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { View, SafeAreaView,Text,Image,FlatList, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/UserContext";
import { EventList, EventNames,FINA_score } from "../context/WorldRecords";
import { auth,db } from "../services/firebaseConfig";
import {Card} from "react-native-paper";

const Bests = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = colors[theme.mode];
    const [refreshing, setRefreshing] = useState(false);
    const [isFetched, setIsFetched]=useState(false);
    const {loggedInUser}= useAuth()
    const {needRefresh, callRefresh}=useAuth()
    const dataDict={}
    const [hookedData,setHookedData]=useState({})
    const userId = loggedInUser.uid;
    const user_doc=db.collection("users").doc(`${userId}`);
    const get_user_data = async(doc1)=>{doc1.get()
        .then(Snapshot=>{
          //console.log(Snapshot.data())
          const snap=Snapshot.data();
          for (x in EventList){
            dataDict[EventList[x]]=snap[EventList[x]]
            
          }
          setHookedData(dataDict)
          setIsFetched(true)
        })}

        if (!isFetched){
        get_user_data(user_doc.collection('times').doc('bests'))
      }
        
      useEffect(() => {
        if (needRefresh){
          setIsFetched(false)
          callRefresh(false)
        }
      });
        const styles = StyleSheet.create({
          Container: {
            flex: 1,
          },
          title:{
            color:activeColors.onSecondary,
            fontSize:32,
            fontFamily:"Cochin",
            fontWeight:"bold",
            textAlign:"center"
          },
          data:{
            color:activeColors.secondaryContainer,
            fontSize:20,
            fontFamily:"Cochin",
            textAlign:"center"
            
          },
          header:{
            color:activeColors.onSecondary,
            fontSize:50,
            fontFamily:"Cochin",
            textAlign:'center'
          },
        });     
       
    
    const onRefresh = () => {
        setRefreshing(true);

        // Fetch new data here and update your state

        // After fetching the data, set refreshing to false
        setRefreshing(false);
    };
  


    return (
    <ScrollView 
    style={[
      {
        backgroundColor: activeColors.primary,
        alignContent:'center'
      },
      styles.Container,
    ]}
    contentContainerStyle={{ flexGrow: 1 }}>

      <Text style={styles.header}>
            Your Best Times
          </Text>

    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr50"]}: {hookedData["Fr50"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr50",hookedData["Fr50"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr100"]}: {hookedData["Fr100"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr100",hookedData["Fr100"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr200"]}: {hookedData["Fr200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr200",hookedData["Fr200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr500"]}: {hookedData["Fr500"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr500",hookedData["Fr500"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr1000"]}: {hookedData["Fr1000"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr1000",hookedData["Fr1000"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr1650"]}: {hookedData["Fr1650"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr1650",hookedData["Fr1650"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Bk100"]}: {hookedData["Bk100"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Bk100",hookedData["Bk100"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Bk200"]}: {hookedData["Bk200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Bk200",hookedData["Bk200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Br100"]}: {hookedData["Br100"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Br100",hookedData["Br100"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Br200"]}: {hookedData["Br200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Br200",hookedData["Br200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fl100"]}: {hookedData["Fl100"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fl100",hookedData["Fl100"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fl200"]}: {hookedData["Fl200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fl200",hookedData["Fl200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["IM200"]}: {hookedData["IM200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("IM200",hookedData["IM200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["IM400"]}: {hookedData["IM400"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("IM400",hookedData["IM400"])}
    </Text>     
    </Card>
    </ScrollView>
  );

  

};



export default Bests;

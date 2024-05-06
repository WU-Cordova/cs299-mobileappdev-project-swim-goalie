import React, { useContext, useState, useRef, useEffect} from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { View, SafeAreaView,Text,Image,FlatList, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/UserContext";
import { EventList, EventNames,FINA_score ,PercentDrop} from "../context/WorldRecords";
import { auth,db } from "../services/firebaseConfig";
import {Card} from "react-native-paper";

const Goals = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = colors[theme.mode];
    const [refreshing, setRefreshing] = useState(false);
    const [isFetched, setIsFetched]=useState(false);
    const {loggedInUser}= useAuth()
    const {needRefresh, callRefresh}=useAuth()
        //G and B to have different data for Goals and Bests respectively 
        const dataDictG={}
        const [hookedDataG,setHookedDataG]=useState({})
        const dataDictB={}
        const [hookedDataB,setHookedDataB]=useState({})
        const userId = loggedInUser.uid;
        const user_doc=db.collection("users").doc(`${userId}`);
        const get_goal_data = async(doc1)=>{doc1.get()
          .then(Snapshot=>{
            //console.log(Snapshot.data())
            const snap=Snapshot.data();
            for (x in EventList){
              dataDictG[EventList[x]]=snap[EventList[x]]
              
            }
            setHookedDataG(dataDictG)
           
            setIsFetched(true)
            
          })}
        const get_best_data = async(doc1)=>{doc1.get()
            .then(Snapshot=>{
            //console.log(Snapshot.data())
            const snap=Snapshot.data();
            for (x in EventList){
              dataDictB[EventList[x]]=snap[EventList[x]]
                
              }
            setHookedDataB(dataDictB)
            setIsFetched(true)
            
            })}
        
        if (!isFetched){
          get_goal_data(user_doc.collection('times').doc('goals'))
          get_best_data(user_doc.collection('times').doc('bests'))
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
          txt:{
            color:activeColors.onPrimary,
            fontSize:25,
            fontFamily:"Cochin",
            textAlign:'center'
            }
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
            Your Goal Times
          </Text>

    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr50"]}: {hookedDataG["Fr50"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr50",hookedDataG["Fr50"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr100"]}: {hookedDataG["Fr100"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr100",hookedDataG["Fr100"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr200"]}: {hookedDataG["Fr200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr200",hookedDataG["Fr200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr500"]}: {hookedDataG["Fr500"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr500",hookedDataG["Fr500"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr1000"]}: {hookedDataG["Fr1000"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr1000",hookedDataG["Fr1000"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fr1650"]}: {hookedDataG["Fr1650"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fr1650",hookedDataG["Fr1650"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Bk100"]}: {hookedDataG["Bk100"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Bk100",hookedDataG["Bk100"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Bk200"]}: {hookedDataG["Bk200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Bk200",hookedDataG["Bk200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Br100"]}: {hookedDataG["Br100"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Br100",hookedDataG["Br100"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Br200"]}: {hookedDataG["Br200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Br200",hookedDataG["Br200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fl100"]}: {hookedDataG["Fl100"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fl100",hookedDataG["Fl100"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["Fl200"]}: {hookedDataG["Fl200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("Fl200",hookedDataG["Fl200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["IM200"]}: {hookedDataG["IM200"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("IM200",hookedDataG["IM200"])}
    </Text>     
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12}}>
    <Text style={styles.title}>
    {EventNames["IM400"]}: {hookedDataG["IM400"]}
    </Text>
    <Text style={styles.data}>
     FINA Score:   {FINA_score("IM400",hookedDataG["IM400"])}
    </Text>     
    </Card>
    <Text style={styles.txt}>
           Target Percentage Drops:
          </Text>
          <Text style={styles.txt}>
           50 Free: {PercentDrop(hookedDataG["Fr50"],hookedDataB["Fr50"])}%
          </Text>
          <Text style={styles.txt}>
           100 Free: {PercentDrop(hookedDataG["Fr100"],hookedDataB["Fr100"])}%
          </Text>
          <Text style={styles.txt}>
           200 Free: {PercentDrop(hookedDataG["Fr200"],hookedDataB["Fr200"])}%
          </Text>
          <Text style={styles.txt}>
           500 Free: {PercentDrop(hookedDataG["Fr500"],hookedDataB["Fr500"])}%
          </Text>
          <Text style={styles.txt}>
           1000 Free: {PercentDrop(hookedDataG["Fr1000"],hookedDataB["Fr1000"])}%
          </Text>
          <Text style={styles.txt}>
           1650 Free: {PercentDrop(hookedDataG["Fr1650"],hookedDataB["Fr1650"])}%
          </Text>
          <Text style={styles.txt}>
           100 Back: {PercentDrop(hookedDataG["Bk100"],hookedDataB["Bk100"])}%
          </Text>
          <Text style={styles.txt}>
           200 Back: {PercentDrop(hookedDataG["Bk200"],hookedDataB["Bk200"])}%
          </Text>
          <Text style={styles.txt}>
           100 Breast: {PercentDrop(hookedDataG["Br100"],hookedDataB["Br100"])}%
          </Text>
          <Text style={styles.txt}>
           200 Breast: {PercentDrop(hookedDataG["Br200"],hookedDataB["Br200"])}%
          </Text>
          <Text style={styles.txt}>
           100 Fly: {PercentDrop(hookedDataG["Fl100"],hookedDataB["Fl100"])}%
          </Text>
          <Text style={styles.txt}>
           200 Fly: {PercentDrop(hookedDataG["Fl200"],hookedDataB["Fl200"])}%
          </Text>
          <Text style={styles.txt}>
           200 IM: {PercentDrop(hookedDataG["IM200"],hookedDataB["IM200"])}%
          </Text>
          <Text style={styles.txt}>
           400 IM: {PercentDrop(hookedDataG["IM400"],hookedDataB["IM400"])}%
          </Text>
          <Text style={{paddingBottom:200}}>
            {/* adding padding to the bottom */}
        </Text>
    </ScrollView>
    
  );

  

};



export default Goals;

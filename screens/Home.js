import React, { useContext, useState, useEffect} from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { View, ScrollView,Text,Image,Card } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/UserContext"
import { FINA_score,EventList, PercentDrop } from "../context/WorldRecords";
import { db } from "../services/firebaseConfig";
const Home = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [refreshing, setRefreshing] = useState(false);
  const {needRefresh}=useAuth()
    const [isFetched, setIsFetched]=useState(false);
    const {loggedInUser}= useAuth()
    //G and B to have different data for Goals and Bests respectively 
    const dataDictG={}
    const [hookedDataG,setHookedDataG]=useState({})
    const dataDictB={}
    const [hookedDataB,setHookedDataB]=useState({})
    const updateDicB={}
    const updateDicG={}
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
  
  const sortedBests = Object.values(dataDictB).sort();
  const BestTimes = sortedBests.slice(0, 5);
  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      style={[
        {
          backgroundColor: activeColors.primary,
          padding:20,
        },
        styles.Container,
      ]}
      contentContainerStyle={{ flexGrow: 1 }}
      >
        
          <Text style={{
            color:activeColors.text,
            fontSize:32,
            fontFamily:"Cochin",
            paddingTop:100,
            textAlign:'center'
          }}>
            Hi! Welcome to SwimGoalie.

            Use the Input Time tab to update your goal and best times.

            You can then view these stored times from their respective tabs.

            This tab is where we calculate the percentages you have to drop to reach your goals.

            Swim Fast!
          </Text>
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
          <Text style={{paddingBottom:50}}>
            {/* adding padding to the bottom */}
          </Text>

    </ScrollView>
  );

  
};



export default Home;

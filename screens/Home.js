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

  const styles = StyleSheet.create({
    Container: {
      flex: 1,
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

            Swim Fast!
          </Text>
          

    </ScrollView>
  );

  
};



export default Home;

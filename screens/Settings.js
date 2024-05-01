import {
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Appearance,
  Text,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import StyledText from "../components/texts/StyledText";
import SettingsItem from "../components/settings/SettingsItem";
import { Ionicons } from "@expo/vector-icons";
import { auth,db } from "../services/firebaseConfig";
import { useAuth } from "../context/UserContext";





const Settings = ({ navigation }) => {

  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const [Name, setName]=useState('');
  const {loggedInUser}=useAuth();
  const userId = loggedInUser.uid;
  const user_doc=db.collection("users").doc(`${userId}`);
  const get_user_data = (doc1)=>{doc1.get()
    .then(Snapshot=>{
      //console.log(Snapshot.data())
      const snap=Snapshot.data();
      setName(snap['displayName'])

    })}

    //This stops an infinite update loop 
    if (Name==''){
      get_user_data(user_doc)
      
      
    }
  
  //here we set the state of the switch to the current theme
  //theme.mode is the current theme which we get from the context
  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === "dark");

  //here we toggle the theme and update the state of the switch
  const toggleTheme = () => {

    updateTheme();
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    //here we listen for the color scheme change and update the state of the switch
    //this is necessary so that the switch automatically updates
    //when the user changes the theme from the settings
    Appearance.addChangeListener(({ colorScheme }) => {
      console.log(`colorScheme: ${colorScheme}`)
      colorScheme === "dark" ? setIsDarkTheme(true) : setIsDarkTheme(false);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={[{ backgroundColor: activeColors.primary }, styles.Container]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >

    
      <StyledText style={{ color: activeColors.onPrimary , fontFamily:"Cochin"}} bold>
        Profile info
        
      </StyledText>

      <StyledText style={{ color: activeColors.onPrimary, alignSelf:'center', fontFamily:"Cochin"}} bold>
        Name: {Name} 
        
      </StyledText>

      <StyledText style={{ color: activeColors.onPrimary , fontFamily:"Cochin"}} bold>
        Theme Switch
      </StyledText>
      
      <View style={styles.section}>
        <SettingsItem label="Dark Mode">
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            thumbColor={isDarkTheme ? "#fff" : activeColors.tertiary}
            ios_backgroundColor={activeColors.primary}
            trackColor={{
              false: activeColors.primary,
              true: activeColors.secondary,
            }}
          ></Switch>
        </SettingsItem>
      </View>
      
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <SettingsItem>
            <Ionicons name="log-out-outline" size={24} color="red" />
            <StyledText style={{ color: "red", fontFamily:"Cochin" }}> Logout</StyledText>
          </SettingsItem>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 25,
  },
  section: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
    fontFamily:"Cochin",
  },
  logout: {
    bottom: 0,
    position: "absolute",
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    alignSelf: "center",
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    fontFamily:"Cochin",
  },
});

export default Settings;

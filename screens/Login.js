import React, { useContext } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import CustomInputField from "../components/CustomInputField";

const Login = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    
      <ScrollView style={{ 
        paddingTop:256,
        backgroundColor: activeColors.primary,
        flex: 1,
        paddingHorizontal: 25,
        }}>
        
        <Text style={{
          alignSelf:'center',
          textAlign:"center",
          fontSize:32,
          fontFamily:"Cochin",
          color:activeColors.onPrimary,
          paddingHorizontal:12,
          paddingBottom:30
        }}
        >
          Welcome to SwimGoalie.
          Please enter your name
          so we can find your times.
          
        </Text>
     
        
        <CustomInputField label="Name"
          inputType="Name"


  >
        </CustomInputField>
        <CustomButton label="Submit"
        color={activeColors.onPrimary}
        onPress={() =>
          navigation.navigate('Footer')}
        >
        </CustomButton>
        
        

        
       
      </ScrollView>
    
  );
};


export default Login;

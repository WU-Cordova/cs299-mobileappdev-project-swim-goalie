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
    <SafeAreaView
      style={{
        backgroundColor: activeColors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ScrollView style={{ 
        paddingTop:32,
        backgroundColor: activeColors.primary,
        flex: 1,
        paddingHorizontal: 25 }}>
        <Text style={{
          alignSelf:'center',
          fontSize:64,
          color:activeColors.accent
        }}
        >
          LocalVibes!!
        </Text>
        <Image
        style={{
          height:256,
          width:256,
          alignSelf:"center"
        }}
        source={require('../assets/icon.png')}
        >

        </Image>

        <CustomInputField label="email"
          inputType="email"
          icon={<Ionicons name="mail-outline" color={activeColors.tertiary}
          size={28} />}
  >
        </CustomInputField>
        <CustomInputField label="password"
          inputType="password"
          icon={<Ionicons name="lock-closed-outline"
          color={activeColors.tertiary}
          size={28} />}
          fieldButtonLabel="Forgot password?"


  >
        </CustomInputField>
        <CustomButton label="Submit"
        onPress={() =>
          navigation.navigate('Footer')}
        >
        </CustomButton>
        
        <TouchableOpacity 
        onPress={()=>
          navigation.navigate('Register')}>
        <Text style={{ color: activeColors.accent, fontWeight: "700",alignSelf:'center' }}>
          Register!
        </Text>
      </TouchableOpacity>

        
       
      </ScrollView>
    </SafeAreaView>
  );
};


export default Login;

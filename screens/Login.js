import { app, auth } from "../services/firebaseConfig";
import React, { useContext, useState } from "react";
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
import { useAuth } from "../context/UserContext";

const Login = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const {setLoggedInUser} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); 
  const [isFormValid, setIsFormValid] = useState(false); 
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  

  const validateForm = () => { 
    let errors = {}; 
    console.log(email)
    if (!email) { 
        errors.email = 'Email is required.'; 
    } else if (!/\S+@\S+\.\S+/.test(email)) { 
        errors.email = 'Email is invalid.'; 
    } 

    if (!password) { 
        errors.password = 'Password is required.'; 
    } else if (password.length < 6) { 
        errors.password = 'Password must be at least 6 characters.'; 
    } 

    let isFormValid = Object.keys(errors).length === 0;
    setErrors(errors); 
    setIsFormValid(isFormValid); 
    if (!isFormValid){
      console.log(errors)}
    return isFormValid;
}; 

const login  = async () =>  {
  let errors = {}; 
  console.log("logging in attempt");
  
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    setLoginSuccessful(true);
    const user = userCredential.user;
    setLoggedInUser(user);
    auth.updateCurrentUser(user);
    
    console.log(`Logged on successfully.`)
    navigation.navigate("Footer");
  } catch (error) {
    console.log(`Login User error code ${error}`);
    errors.login = "Invalid login or password";
    setLoginSuccessful(false);
    setErrors(errors);
  }
};

  const handleLogin = async () => {
      console.log(`Login button pressed {Email: ${email}`)

      if (!validateForm()) {
        console.log('invalid form')
        return
        ; 
      }

      setLoginSuccessful(false);
      await login();
  }

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
          fontFamily:"Cochin",
          color:activeColors.accent
        }}
        >
          Welcome to SwimGoalie!
        </Text>
      


        <CustomInputField label="email"
          inputType="email"
          icon={<Ionicons name="mail-outline" color={activeColors.tertiary}
          size={28} 
           />}
          onChangeTextFunction={setEmail}
  >
        </CustomInputField>
        <CustomInputField label="password"
          inputType="password"
          icon={<Ionicons name="lock-closed-outline"
          color={activeColors.tertiary}
          size={28} />}
          
          onChangeTextFunction={setPassword}


  >
        </CustomInputField>
        <CustomButton label="Submit"
        onPress={handleLogin}
        >
        </CustomButton>
        
        <TouchableOpacity 
        onPress={()=>
          navigation.navigate('Register')}>
        <Text style={{ color: activeColors.accent, fontWeight: "700",alignSelf:'center',fontFamily:"Cochin" }}>
          Register
        </Text>
      </TouchableOpacity>

        
       
      </ScrollView>
    </SafeAreaView>
  );
};


export default Login;

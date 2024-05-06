import { app, auth,db } from "../services/firebaseConfig"
import React, { useState, useContext } from "react";
import {useAuth} from "../context/UserContext";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

import DatePicker from "react-native-date-picker";

import CustomInputField from "../components/CustomInputField";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import CustomButton from "../components/CustomButton";
import { setDoc} from "firebase/firestore";
import { EmptyList, EventList } from "../context/WorldRecords";


const Register = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); 
  const [isFormValid, setIsFormValid] = useState(false); 
  const {loggedInUser,setLoggedInUser}=useAuth();

  const validateForm = () => { 
    let errors = {}; 

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

    if (!confirmPassword) { 
        errors.confirmPassword = 'Password confirmation is required.'; 
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    } else if (password.length < 6) { 
        errors.password = 'Password must be at least 6 characters.'; 
    } 

    let isFormValid = Object.keys(errors).length === 0;
    setErrors(errors); 
    setIsFormValid(isFormValid); 

    return isFormValid;
}; 

const createUser = async () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedInUser(user);
        auth.updateCurrentUser(user);
        const userId=user.uid;
        const user_doc=db.collection("users").doc(`${userId}`)
        setDoc(user_doc, {displayName:Name,dateJoined:currentDate},{merge:true});
        const goal_doc=db.collection("users").doc(`${userId}`).collection("times").doc("goals");
        const best_doc=db.collection("users").doc(`${userId}`).collection("times").doc("bests");
        setDoc(goal_doc,EmptyList,{merge:true});
        setDoc(best_doc,EmptyList,{merge:true});
        
       
  
      })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Create User error code ${errorCode} - ${errorMessage}`);
    });
    
    console.log("User created");
  };


  

  const handleRegister = async () => {
    console.log(`Register button pressed {Full Name: ${Name}, Email: ${email}`)
    
    if (!validateForm()) {
      return; 
    }

    createUser()
    navigation.navigate("Footer");
  }


  return (
    <SafeAreaView
      style={{
        backgroundColor: activeColors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25, marginTop: 50 }}>
  

        <Text 
        style={{
          color:activeColors.text,
          fontSize:32,
          alignSelf:'center',
          fontFamily:"Cochin",
        }}
        >
          Registration Page!
        </Text>
        

       
        <CustomInputField label="username"
          inputType="standard"
          onChangeTextFunction={setName}
        >
       
        </CustomInputField>
        <CustomInputField label="email"
          inputType="email"
         
          onChangeTextFunction={setEmail}
         >
         </CustomInputField>

         <CustomInputField label="new password"
          inputType="newpass"
          
          onChangeTextFunction={setPassword}
        >
        </CustomInputField>

        <CustomInputField label="confirm password"
          inputType="newpass"
          
          onChangeTextFunction={setConfirmPassword}
        >
        </CustomInputField>


        <CustomButton label="Register"
        onPress={handleRegister}
        >
        </CustomButton>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

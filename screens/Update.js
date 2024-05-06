import React, { useContext, useState, useRef, useEffect} from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { View, SafeAreaView,Text,Image, ScrollView,Button } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth} from "../context/UserContext";
import { EventList, EventNames,FINA_score } from "../context/WorldRecords";
import { auth,db } from "../services/firebaseConfig";
import {Card} from "react-native-paper";
import CustomInputField from "../components/CustomInputField";
import {CustomButton} from "../components/CustomButton"
import { setDoc} from "firebase/firestore";


const Update = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = colors[theme.mode];
    const [refreshing, setRefreshing] = useState(false);
    const {callRefresh}=useAuth()
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
        console.log(hookedDataG)
        setIsFetched(true)
        console.log('successfully pulled goal times')
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
        console.log(hookedDataB)
        console.log('successfully pulled best times')
        })}
    
    if (!isFetched){
      get_goal_data(user_doc.collection('times').doc('goals'))
      get_best_data(user_doc.collection('times').doc('bests'))
    }
        
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

    const add_to_dic=(dictionary, key,value)=>{
      dictionary[key]=value
    }

    const onSave = async () => {
      
      await setDoc(user_doc.collection('times').doc('bests'), updateDicB,{merge:true});
      await setDoc(user_doc.collection('times').doc('goals'), updateDicG,{merge:true});
      setIsFetched(false)
      callRefresh(true)
      //Also do something here to update Goals and Bests
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
    contentContainerStyle={{ flexGrow: 1, padding:12 }}>

      <Text style={styles.header}>
            Input/Update Times
          </Text>
      <Button
    onPress={onSave}
    title="Save Button"
    color={activeColors.onPrimary}
    ></Button>

    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Fr50"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Fr50"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Fr50",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Fr50"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Fr50",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Fr100"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Fr100"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Fr100",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Fr100"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Fr100",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Fr200"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Fr200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Fr200",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Fr200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Fr200",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Fr500"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Fr500"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Fr500",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Fr500"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Fr500",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Fr1000"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Fr1000"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Fr1000",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Fr1000"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Fr1000",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Fr1650"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Fr1650"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Fr1650",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Fr1650"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Fr1650",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Bk100"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Bk100"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Bk100",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Bk100"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Bk100",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Bk200"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Bk200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Bk200",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Bk200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Bk200",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Br100"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Br100"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Br100",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Br100"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Br100",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Br200"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Br200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Br200",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Br200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Br200",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Fl100"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Fl100"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Fl100",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Fl100"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Fl100",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["Fl200"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["Fl200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"Fl200",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["Fl200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"Fl200",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["IM200"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["IM200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"IM200",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["IM200"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"IM200",text)}
         ></CustomInputField>   
    </Card>
    <Card style={{backgroundColor:activeColors.secondary,justifyContent:"space-evenly",marginBottom:12,padding:10}}>
    <Text style={styles.title}>
    {EventNames["IM400"]}:
    </Text>
    <Text style={styles.data}>
     Update Best Time:
    </Text>
    <CustomInputField
        label={hookedDataB["IM400"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicB,"IM400",text)}
         ></CustomInputField>
    <Text style={styles.data}>
     Update Goal Time:
    </Text>  
    <CustomInputField
        label={hookedDataG["IM400"]}
        inputType={'time'}
        onChangeTextFunction={text=>add_to_dic(updateDicG,"IM400",text)}
         ></CustomInputField>   
    </Card>
    </ScrollView>
  );

  

};



export default Update;

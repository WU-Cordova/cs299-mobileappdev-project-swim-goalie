import React, { useContext } from "react";
import Settings from "../screens/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import Home from "../screens/Home";
import Update from "../screens/Update";
import Bests from "../screens/Bests";
import Goals from "../screens/Goals";

const Tab = createBottomTabNavigator();

export default function Footer() {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: activeColors.surface,
          
        },
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          }else if (route.name === "Goal Times") {
            iconName = focused ? "hourglass" : "hourglass-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "Best Times") {
            iconName = focused ? "stopwatch" : "stopwatch-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "Update Times") {
            iconName = focused ? "create" : "create-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          }  else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } 

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: activeColors.onSurface,
        tabBarInactiveTintColor: activeColors.onSurfaceVariant,
        headerTitleAlign: "left",
        headerTitleStyle: {
          color:activeColors.onSurface,
          paddingLeft: 10,
          fontSize: 24,
          fontFamily:"Cochin"
        },
        headerStyle: {
          backgroundColor: activeColors.surface,
        },
        headerTintColor: activeColors.tint,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Best Times" component={Bests} />
      <Tab.Screen name="Goal Times" component={Goals} />
      <Tab.Screen name="Update Times" component={Update} />
      <Tab.Screen name="Settings" component={Settings} />
      
      

    </Tab.Navigator>
  );
}

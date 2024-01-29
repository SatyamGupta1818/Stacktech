import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#008e97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={26} color="black" />
            ) : (
              <MaterialCommunityIcons
                name="home-outline"
                size={24}
                color="black"
              />
            ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarLabelStyle: { color: "#008e97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="search" size={26} color="black" />
            ) : (
              <Feather name="search" size={24} color="black" />
            ),
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          tabBarLabel: "Post",
          tabBarLabelStyle: { color: "#008e97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="pluscircle" size={26} color="black" />
            ) : (
              <AntDesign name="plus" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          tabBarLabel: "Community",
          tabBarLabelStyle: { color: "#008e97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="people" size={26} color="black" />
            ) : (
              <Ionicons name="people-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
          tabBarLabelStyle: { color: "#008e97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="account-circle" size={26} color="black" />
            ) : (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={24}
                color="black"
              />
            ),
        }}
      />
    </Tabs>
  );
}

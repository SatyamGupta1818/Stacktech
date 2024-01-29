import { StyleSheet, Text, View , SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Alert} from 'react-native'
import React, {useState} from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios"

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter("");



  const handleRegister = ()=>{
    const user = {
      name:name,
      email:email,
      password:password,
      profileImage:image 
    }

    axios.post("http://192.168.0.107:8080/register",user).then((response)=>{
      console.log(response);
      Alert.alert("Registration Successfull", "You have been registered successfully");
      setName("");
      setEmail("");
      setPassword("");
      setImage("");

    }).catch((error)=>{
      Alert.alert("Registration failed" , "An error occured while registering");
      console.log("Registration failed",error);
    })

  }

  return (
    <SafeAreaView
    style={{
      flex: 1,
      alignItems: "center",
      backgroundColor: "white",
      paddingTop: 20,
    }}
  >
    <View>
      <Image
        style={{ width: 150, height: 100, resizeMode: "contain" }}
        source={{
          uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png",
        }}
      />
    </View>
    <KeyboardAvoidingView>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "#041E42",
            fontSize: 17,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Register to your account
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#E0E0E0",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <MaterialCommunityIcons
            style={{ marginLeft: 8 }}
            name="account"
            size={28}
            color="black"
          />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              color: "grey",
              marginVertical: 10,
              width: 300,
              fontSize: name ? 17 : 17,
            }}
            placeholder="Enter your Name"
          />
        </View>
      </View>
      <View style={{ marginTop: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={28}
              color="black"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "grey",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 17 : 17,
              }}
              placeholder="Enter your emial"
            />
          </View>
        </View>
      <View style={{ marginTop: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#E0E0E0",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <Entypo
            style={{ marginLeft: 8 }}
            name="lock"
            size={28}
            color="black"
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={{
              color: "grey",
              marginVertical: 10,
              width: 300,
              fontSize: password ? 17 : 17,
            }}
            placeholder="Enter your Password"
          />
        </View>
      </View>
      <View style={{ marginTop: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#E0E0E0",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <FontAwesome
            style={{ marginLeft: 8 }}
            name="image"
            size={28}
            color="black"
          />
          <TextInput
            value={image}
            onChangeText={(text) => setImage(text)}
            style={{
              color: "grey",
              marginVertical: 10,
              width: 300,
              fontSize: image ? 17 : 17,
            }}
            placeholder="Enter your Image url"
          />
        </View>
      </View>
      
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Keep me Logged in</Text>
        <Text style={{ color: "#007FFF", fontWeight: "500" }}>
          Forget Password?
        </Text>
      </View>

      <View style={{ marginTop: 50 }} />
      <Pressable
      onPress={handleRegister}
        style={{
          width: 200,
          backgroundColor: "#0072b1",
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 15,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Register
        </Text>
      </Pressable>
      <Pressable onPress={()=> router.replace('/login')} style={{ marginTop: 15 }}>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}
        >
          Already have an account? Log in
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({})
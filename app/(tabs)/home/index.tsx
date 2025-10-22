import { useRouter, useNavigation, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../../../store/hooks";
import { setVendorData } from "@/store/vendorSlice";
import { Button } from "../../../components/Button";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

const VendorHomeScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://localhost:3000/vendor/");
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors", error);
      }
    };
    fetchVendors();
  }, []);

  const renderVendor = ({ item }) => (
    <TouchableOpacity
      style={styles.circle}
      onPress={() => {
        dispatch(
          setVendorData({ vendorId: item.id, name: item.business_name })
        );
        router.push({
          pathname: `/vendor/dashboard`,
          params: { vendorId: item.id },
        });
      }}
    >
      <Text style={styles.circleText}>{item.business_name.charAt(0)}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <MaterialCommunityIcons
                name="menu"
                size={26}
                color="#000"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {vendors.length > 0 ? (
            <>
              <Text>CTA</Text>
              <FlatList
                data={vendors}
                keyExtractor={(item) => item.id}
                renderItem={renderVendor}
                horizontal={true}
                contentContainerStyle={{ gap: 12 }}
              />
              <TouchableOpacity>
                <MaterialCommunityIcons
                  style={styles.addButton}
                  name="plus-circle-outline"
                  size={40}
                  onPress={() => router.push("/vendor/sign-up")}
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.avatar} />
              <Text style={styles.name}>Chester Heels</Text>
              <Button
                label="Add Your First Business"
                navigateTo="/vendor/sign-up"
                style={{}}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    backgroundColor: "black",
    borderRadius: 80,
    alignSelf: "center",
  },
  name: {
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  circleText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    right: 20,
    botton: 30,
    borderRadius: 50,
  },
  addButtonTwo: {
    position: "absolute",
    left: 275,
    top: 650,
  },
});

export default VendorHomeScreen;

// import { useRouter, Stack, useNavigation } from "expo-router";
// import { useEffect, useState } from "react";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useAppDispatch } from "../../store/hooks";
// import { setVendorData } from "@/store/vendorSlice";
// import { Button } from "../../components/Button";
// import { NavigationContainer } from "@react-navigation/native";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
// } from "react-native";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
// } from "@react-navigation/drawer";

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent({ vendors, router }) {
//   return (
//     <DrawerContentScrollView style={{ paddingTop: 60 }}>
//       <Text style={styles.drawerTitle}>Your Businesses</Text>

//       {vendors.map((vendor) => (
//         <TouchableOpacity
//           key={vendor.id}
//           onPress={() =>
//             router.push({
//               pathname: "/vendor/dashboard",
//               params: { vendorId: vendor.id },
//             })
//           }
//           style={styles.drawerItem}
//         >
//           <Text style={styles.drawerText}>{vendor.business_name}</Text>
//         </TouchableOpacity>
//       ))}

//       <TouchableOpacity
//         style={[styles.drawerItem, { marginTop: 15 }]}
//         onPress={() => router.push("/vendor/sign-up")}
//       >
//         <MaterialCommunityIcons
//           name="plus-circle-outline"
//           size={22}
//           color="#2E6CF6"
//         />
//         <Text
//           style={{
//             color: "#2E6CF6",
//             fontSize: 16,
//             marginLeft: 8,
//             fontWeight: "600",
//           }}
//         >
//           Add New Business
//         </Text>
//       </TouchableOpacity>
//     </DrawerContentScrollView>
//   );
// }

// function VendorHome({ vendors, renderVendor, router }) {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         {vendors.length > 0 ? (
//           <>
//             <Text style={styles.ctaText}>Your Businesses</Text>
//             <FlatList
//               data={vendors}
//               keyExtractor={(item) => item.id}
//               renderItem={renderVendor}
//               horizontal
//               contentContainerStyle={{ gap: 12 }}
//             />
//             <TouchableOpacity onPress={() => router.push("/vendor/sign-up")}>
//               <MaterialCommunityIcons
//                 style={styles.addButton}
//                 name="plus-circle-outline"
//                 size={40}
//               />
//             </TouchableOpacity>
//           </>
//         ) : (
//           <>
//             <View style={styles.avatar} />
//             <Text style={styles.name}>Chester Heels</Text>
//             <Button
//               label="Add Your First Business"
//               navigateTo="/vendor/sign-up"
//             />
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// export default function VendorHomeScreen() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const navigation = useNavigation();
//   const [vendors, setVendors] = useState([]);

//   // useEffect(() => {
//   //   const fetchVendors = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:3000/vendor/");
//   //       const data = await response.json();
//   //       setVendors(data);
//   //     } catch (error) {
//   //       console.error("Error fetching vendors", error);
//   //     }
//   //   };
//   //   fetchVendors();
//   // }, []);

//   useEffect(() => {
//     const dummyVendors = [
//       { id: "1", business_name: "Sunset Grille" },
//       { id: "2", business_name: "Tropical Treats" },
//       { id: "3", business_name: "Bajan Bites" },
//     ];
//     setVendors(dummyVendors);
//   }, []);

//   const renderVendor = ({ item }) => (
//     <TouchableOpacity
//       style={styles.circle}
//       onPress={() => {
//         dispatch(
//           setVendorData({ vendorId: item.id, name: item.business_name })
//         );
//         router.push({
//           pathname: `/vendor/dashboard`,
//           params: { vendorId: item.id },
//         });
//       }}
//     >
//       <Text style={styles.circleText}>{item.business_name.charAt(0)}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <>
//       {/* ✅ Single Expo Router header (with hamburger menu) */}
//       <Stack.Screen
//         options={{
//           title: "Home",
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.openDrawer()} // open drawer when tapped
//               style={{ marginLeft: 10 }}
//             >
//               <MaterialCommunityIcons name="menu" size={26} color="#000" />
//             </TouchableOpacity>
//           ),
//         }}
//       />

//       {/* ✅ Drawer under the same header */}
//       <Drawer.Navigator
//         screenOptions={{ headerShown: false }}
//         drawerContent={() => (
//           <CustomDrawerContent vendors={vendors} router={router} />
//         )}
//       >
//         <Drawer.Screen name="VendorHome">
//           {(props) => (
//             <VendorHome
//               {...props}
//               vendors={vendors}
//               renderVendor={renderVendor}
//               router={router}
//             />
//           )}
//         </Drawer.Screen>
//       </Drawer.Navigator>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     marginTop: 20,
//   },
//   ctaText: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//   },
//   avatar: {
//     width: 150,
//     height: 150,
//     backgroundColor: "black",
//     borderRadius: 80,
//     alignSelf: "center",
//   },
//   name: {
//     paddingTop: 10,
//     paddingBottom: 10,
//     alignSelf: "center",
//   },
//   circle: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     backgroundColor: "blue",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   circleText: {
//     color: "white",
//     fontSize: 30,
//     fontWeight: "bold",
//   },
//   addButton: {
//     marginTop: 20,
//     alignSelf: "center",
//   },
//   drawerTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 10,
//     marginLeft: 20,
//   },
//   drawerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   drawerText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });

import { useAppDispatch } from "../../../store/hooks";
import { Button } from "../../../components/Button";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const VendorHomeScreen = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.avatar} />
          <Text style={styles.name}>Chester Heels</Text>
          <Button
            label="Add Your First Business"
            navigateTo="/vendor/sign-up"
            style={{}}
          />
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
    bottom: 30,
    borderRadius: 50,
  },
  addButtonTwo: {
    position: "absolute",
    left: 275,
    top: 650,
  },
});

export default VendorHomeScreen;

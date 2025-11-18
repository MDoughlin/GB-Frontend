import { SafeAreaView, View, Text, ScrollView, StyleSheet } from "react-native";
import { useAppSelector } from "@/store/hooks";

const VendorDisplay = () => {
  const { name, menu } = useAppSelector((state) => state.vendor);

  const menuList = menu ?? [];

  let sampleMenu = [
    {
      id: 1,
      name: "Bajan Fried Chicken Plate",
      price: 28.0,
      description:
        "Crispy seasoned chicken served with macaroni pie and coleslaw.",
      category: "Entrees",
    },
    {
      id: 2,
      name: "Coconut Curry Shrimp Bowl",
      price: 32.0,
      description:
        "Shrimp simmered in a creamy coconut curry sauce with rice and steamed vegetables.",
      category: "Seafood",
    },
    {
      id: 3,
      name: "Rum Punch Cheesecake Slice",
      price: 12.0,
      description: "Creamy cheesecake infused with Barbados rum punch flavor.",
      category: "Desserts",
    },
  ];

  return (
    <SafeAreaView>
      <View>
        <Text>{name}</Text>
      </View>
      <View>
        <Text style={styles.heading}>Quick Actions</Text>
      </View>
      <View>
        <Text style={styles.heading}>Menu Preview</Text>
        {sampleMenu.length === 0 ? (
          <Text>No Menu Items Yet</Text>
        ) : (
          <ScrollView horizontal={true}>
            {sampleMenu.map((item) => (
              <View key={item.id}>
                <Text>{item.name}</Text>
                <Text>${item.price.toFixed(2)}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VendorDisplay;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

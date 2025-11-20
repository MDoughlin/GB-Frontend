import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { ActionButton } from "@/components/ActionButton";
import { useAppSelector } from "@/store/hooks";

const VendorDisplay = () => {
  const { name, menu } = useAppSelector((state) => state.vendor);

  const menuList = menu ?? [];

  let sampleMenu = [
    {
      id: 1,
      name: "Bajan Fried Chicken Plate",
      price: 28.0,
      image:
        "https://images.immediate.co.uk/production/volatile/sites/2/2022/05/Chicken-wings-with-Bajan-pepper-sauce-70ad46d.jpg?quality=90&webp=true&resize=800,726",
      description:
        "Crispy seasoned chicken served with macaroni pie and coleslaw.",
      category: "Entrees",
    },
    {
      id: 2,
      name: "Coconut Curry Shrimp Bowl",
      price: 32.0,
      image:
        "https://simshomekitchen.com/wp-content/uploads/2022/04/Jamaican-curry-shrimp-with-coconut-milk-in-a-silver-pan.jpg",
      description:
        "Shrimp simmered in a creamy coconut curry sauce with rice and steamed vegetables.",
      category: "Seafood",
    },
    {
      id: 3,
      name: "Rum Punch Cheesecake Slice",
      price: 12.0,
      image: "https://bajanbite.com/wp-content/uploads/2020/10/sweet-bread.jpg",
      description: "Creamy cheesecake infused with Barbados rum punch flavor.",
      category: "Desserts",
    },
  ];

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.mainHeading}>{name} Dashboard</Text>
      </View>
      <Text style={styles.heading}>Quick Actions</Text>
      <View style={styles.buttons}>
        <ActionButton label={"Edit Business Info"} />
        <ActionButton label={"Add Menu Item"} navigateTo="vendor/menu-item" />
      </View>
      <View>
        <Text style={styles.heading}>Menu Preview</Text>
        {sampleMenu.length === 0 ? (
          <Text>No Menu Items Yet</Text>
        ) : (
          <ScrollView horizontal={true}>
            {sampleMenu.map((item) => (
              <View style={styles.box} key={item.id}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.menuItem}>{item.name}</Text>
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
  box: {
    marginRight: 7,
    marginLeft: 6,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: "row",
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mainHeading: {
    textAlign: "center",
    marginTop: 10,
  },
  menuItem: {
    fontWeight: 600,
  },
});

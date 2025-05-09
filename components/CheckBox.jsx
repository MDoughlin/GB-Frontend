import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";

export function CheckBox({ options, checkedValues, onChange, style }) {
  let updatedCheckedValues = [...checkedValues];
  return (
    <View style={styles.container}>
      {options.map((option) => {
        let active = updatedCheckedValues.includes(option.value);
        return (
          <TouchableOpacity
            key={option.value}
            style={
              active
                ? [styles.checkBox, styles.activeCheckBox]
                : styles.checkBox
            }
            onPress={() => {
              updatedCheckedValues.push(option.value);
              onChange(updatedCheckedValues);
            }}
          >
            <Icon name="checkbox-passive" size={24} />
            <Text style={styles.text}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  checkBox: {
    height: 60,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  text: {
    marginLeft: 15,
  },
});

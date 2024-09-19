import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Difficulty } from "../../types";

interface DropdownProps {
  data: Difficulty[];
  setDifficultyChange: (difficulty: Difficulty) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ data, setDifficultyChange }) => {
  return (
    <View style={styles.dropdown}>
      <Picker
        selectedValue={data[0]}
        onValueChange={itemValue =>
          setDifficultyChange(itemValue as Difficulty)
        }
        style={styles.picker}
      >
        {data.map((dt, i) => (
          <Picker.Item label={dt} value={dt} key={i} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 350,
    height: 50,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default Dropdown;

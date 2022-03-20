import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";

const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRang } = props;
  const isFilterSelected = (filter) => filter == selectedRange;
  return (
    <TouchableOpacity
      onPress={() => setSelectedRang(filterDay)}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isFilterSelected(filterDay)
          ? "#1e1e1e"
          : "transparent",
      }}
    >
      <Text style={{ color: isFilterSelected(filterDay) ? "white" : "grey" }}>
        {filterText}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(FilterComponent);

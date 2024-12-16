import React, { useState } from "react";
import { FlatList, RefreshControl, View, StyleSheet } from "react-native";
import ListCard from "./ListCard";
import { Todo } from "../../hooks/useFetch";
import { useTheme } from "../../contexts/ThemeProvider";
import { Button, ButtonText, Text } from "../Container"; // Styled components imported
import NotFound from "../NotFoundComponent";

type ListingProps = {
  listHeading: string;
  data: Todo[];
  editAction?: (id: number, updates: Todo) => Promise<void>;
  deleteAction?: (todoForDeletion: Todo) => void;
  handleRefresh?: () => void;
  onEndReached?:
    | ((info: { distanceFromEnd: number }) => void)
    | null
    | undefined;
  onToggleComplete?: (id: number, updates: Todo) => Promise<void>;
  showActionButtons: boolean;
  showActionButton?: boolean;
  onAddTodo?: () => void; // Callback for adding a TODO
};

const Listing: React.FC<ListingProps> = ({
  data,
  listHeading,
  editAction,
  deleteAction,
  onEndReached,
  onToggleComplete,
  showActionButtons,
  showActionButton,
  onAddTodo,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: theme.background }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text fontSize={28} color={theme.text} padding="20px 0px">
          {listHeading}
        </Text>

        {/* Action Button */}
        {showActionButton && (
          <Button
            backgroundColor={theme.buttonBackground}
            borderRadius={25}
            padding="10px 20px"
            width="auto"
            onPress={onAddTodo}
          >
            <ButtonText> ╋ Add New</ButtonText>
          </Button>
        )}
      </View>

      {!data.length ? (
        <NotFound
          imageSource={require("../../../assets/images/cnf.jpg")}
          title={"No content found!"}
          
          description={
            "We could not find any todos, but you can still create one"
          }
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListCard
              todo={item}
              onEdit={editAction}
              onDelete={deleteAction}
              onToggleComplete={onToggleComplete}
              showActionButtons={showActionButtons}
            />
          )}
          contentContainerStyle={styles.padBottom}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemSeparator: {
    height: 10,
  },
  padBottom: {
    paddingBottom: 20,
  },
});

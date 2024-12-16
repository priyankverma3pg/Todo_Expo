/**
 * Listing component displays a list of todo items with action buttons for adding, editing, and deleting todos.
 * It also handles displaying a message when no data is available.
 *
 * @component
 * @param {Object} props - The properties for the Listing component.
 * @param {Array<Todo>} props.data - Array of todo items to be displayed in the list.
 * @param {string} props.listHeading - The title to be displayed above the list.
 * @param {Function} props.editAction - Callback function to handle editing a todo item.
 * @param {Function} props.deleteAction - Callback function to handle deleting a todo item.
 * @param {Function} props.onEndReached - Callback function to be triggered when the end of the list is reached.
 * @param {Function} props.onToggleComplete - Callback function to toggle the completion status of a todo item.
 * @param {boolean} props.showActionButtons - Flag to show or hide action buttons (edit, delete, complete).
 * @param {Function} props.onAddTodo - Callback function to add a new todo item.
 *
 * @example
 * <Listing
 *   data={todos}
 *   listHeading="My Todo List"
 *   editAction={handleEdit}
 *   deleteAction={handleDelete}
 *   onEndReached={handleEndReached}
 *   onToggleComplete={handleToggleComplete}
 *   showActionButtons={true}
 *   onAddTodo={handleAddTodo}
 * />
 */

import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import ListCard from "./ListCard";
import { Todo } from "../../hooks/useFetch";
import { useTheme } from "../../contexts/ThemeProvider";
import { Button, ButtonText, Text } from "../CommonStyledComponents"; // Styled components imported
import NotFound from "../NotFoundComponent";
import styled from "styled-components/native";

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
  onAddTodo,
}) => {
  const { theme } = useTheme();

  return (
    <Wrapper backgroundColor={theme.background}>
      {/* Header Section */}
      <Header>
        <Text fontSize={28} color={theme.text} padding="20px 0px">
          {listHeading}
        </Text>

        {/* Action Button */}
        {showActionButtons && (
          <Button
            backgroundColor={theme.buttonBackground}
            borderRadius={25}
            padding="10px 20px"
            width="auto"
            onPress={onAddTodo}
          >
            <ButtonText> + Add New</ButtonText>
          </Button>
        )}
      </Header>

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
          contentContainerStyle={styles.flatlistContainerStyle}
          ItemSeparatorComponent={() => <ItemSeparator />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
    </Wrapper>
  );
};

export default Listing;

const styles = StyleSheet.create({
  flatlistContainerStyle: { padding: 20 },
});

// Styled Components
const Wrapper = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const ItemSeparator = styled.View`
  height: 10px;
`;

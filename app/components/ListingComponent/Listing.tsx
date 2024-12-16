import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import ListCard from "./ListCard";
import { Todo } from "../../hooks/useFetch";
import { useTheme } from "../../contexts/ThemeProvider";
import { Button, ButtonText, Text } from "../Container"; // Styled components imported
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
    <Wrapper backgroundColor={theme.background}>
      {/* Header Section */}
      <Header>
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
          contentContainerStyle={{ paddingBottom: 20 }}
          ItemSeparatorComponent={() => <ItemSeparator />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
    </Wrapper>
  );
};

export default Listing;

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

import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../Container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styled from "styled-components/native";
import { Todo } from "../../hooks/useFetch";
import debounce from "lodash.debounce"; // Import the debounce function

type ListCardProps = {
  todo: Todo;
  onEdit?: (id: number, updates: Todo) => Promise<void>;
  onDelete?: (selectedTodo: Todo) => void;
  onToggleComplete?: (id: number, updates: Todo) => Promise<void>;
  showActionButtons: boolean;
};

const ListCard: React.FC<ListCardProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
  showActionButtons,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);

  const handleSave = () => {
    if (editValue.trim()) {
      todo.todo = editValue;
      onEdit?.(todo.id, todo);
      setIsEditing(false);
    }
  };

  const handleToggle = useCallback(
    debounce((id: number, currentStatus: boolean) => {
      todo.completed = currentStatus;
      onToggleComplete?.(id, todo);
    }, 500), // 500ms debounce time
    []
  );

  return (
    <CardWrapper>
      <RowContainer>
        {/* Content Area */}
        <ContentArea>
          {isEditing ? (
            <StyledTextInput
              value={editValue}
              onChangeText={setEditValue}
              autoFocus
              placeholder="Edit todo"
              placeholderTextColor="#aaa"
              multiline
            />
          ) : (
            <StyledText completed={todo.completed} numberOfLines={3}>
              {todo.todo}
            </StyledText>
          )}
        </ContentArea>

        {/* Fixed Action Buttons */}
        <ButtonContainer>
          {/* Checkbox for Completion */}
          {showActionButtons && (
            <TouchableOpacity
              onPress={() => handleToggle(todo.id, !todo.completed)}
            >
              <MaterialIcons
                name={
                  todo.completed ? "check-box" : "check-box-outline-blank"
                }
                size={24}
                color={todo.completed ? "#4CAF50" : "#666"}
              />
            </TouchableOpacity>
          )}

          {/* Edit/Save Buttons */}
          {showActionButtons && (
            <>
              {isEditing ? (
                <TouchableOpacity onPress={handleSave}>
                  <MaterialIcons name="save" size={24} color="#4CAF50" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setIsEditing(true)}>
                  <MaterialIcons name="edit" size={24} color="#1E88E5" />
                </TouchableOpacity>
              )}
            </>
          )}

          {/* Delete Button */}
          {showActionButtons && (
            <TouchableOpacity onPress={() => onDelete?.(todo)}>
              <MaterialIcons name="delete" size={24} color="#E53935" />
            </TouchableOpacity>
          )}
        </ButtonContainer>
      </RowContainer>
    </CardWrapper>
  );
};

export default ListCard;

// Styled Components
const CardWrapper = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContentArea = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const StyledTextInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #ccc;
  font-size: 16px;
  color: #333;
  flex-wrap: wrap;
`;

const StyledText = styled(Text)<{ completed: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.completed ? "#999" : "#333")};
  text-decoration-line: ${(props) => (props.completed ? "line-through" : "none")};
  flex-wrap: wrap;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  column-gap: 10px;
  justify-content: flex-end;
  align-items: center;
`;

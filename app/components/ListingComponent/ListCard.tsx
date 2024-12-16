/**
 * ListCard component displays a todo item with editable fields and action buttons for edit, delete, and toggle completion.
 *
 * @component
 * @param {Object} props - The properties for the ListCard component.
 * @param {Todo} props.todo - The todo object containing id, todo text, and completion status.
 * @param {Function} props.onEdit - Callback function to handle editing a todo.
 * @param {Function} props.onDelete - Callback function to handle deleting a todo.
 * @param {Function} props.onToggleComplete - Callback function to toggle the completion status of a todo.
 * @param {boolean} props.showActionButtons - Flag to show or hide action buttons (edit, delete, complete).
 *
 * @example
 * <ListCard
 *   todo={todo}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 *   onToggleComplete={handleToggleComplete}
 *   showActionButtons={true}
 * />
 */

import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, StyledImage } from "../CommonStyledComponents";
import styled from "styled-components/native";
import { Todo } from "../../hooks/useFetch";
import debounce from "lodash.debounce"; // Import the debounce function
import { ColorPallete } from "../../constants/Colors";

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

  /**
   * Function trims the extra space and calls the mapped onEdit method with Id, and Todo as the arguement
   * also toggles the editing state to switch the icon used
   */
  const handleSave = () => {
    if (editValue.trim()) {
      todo.todo = editValue;
      onEdit?.(todo.id, todo);
      setIsEditing(false);
    }
  };

  /**
   * Debounced handler to toggle the completion status of a todo item.
   *
   * @callback HandleToggleCallback
   * @param {number} id - The unique identifier of the todo item.
   * @param {boolean} currentStatus - The current completion status of the todo item.
   *
   * @constant {Function} handleToggle
   * @param {HandleToggleCallback} - A debounced callback function executed after a 500ms delay.
   *
   * @description
   * This function uses a debounced callback to update the `completed` status of a todo item.
   * Debounce is used to control the API hits while toggling the Todo complete status
   * It ensures the callback `onToggleComplete` is triggered with the updated status.
   *
   * @example
   * handleToggle(1, true);
   */
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
              placeholderTextColor={ColorPallete.placeholderTextColor}
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
              <StyledImage
                source={
                  todo.completed
                    ? require("../../../assets/images/checkbox.png")
                    : require("../../../assets/images/unchecked.png")
                }
                width={24}
                height={24}
                tintColor={
                  todo.completed
                    ? ColorPallete.buttonGreenBackground
                    : ColorPallete.lightGrey
                }
              />
            </TouchableOpacity>
          )}

          {/* Edit/Save Buttons */}
          {showActionButtons && (
            <>
              {isEditing ? (
                <TouchableOpacity onPress={handleSave}>
                  <StyledImage
                    source={require("../../../assets/images/save.png")}
                    width={20}
                    height={20}
                    tintColor={ColorPallete.buttonGreenBackground}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setIsEditing(true)}>
                  <StyledImage
                    source={require("../../../assets/images/edit.png")}
                    width={24}
                    height={24}
                    tintColor={ColorPallete.actionBack}
                  />
                </TouchableOpacity>
              )}
            </>
          )}

          {/* Delete Button */}
          {showActionButtons && (
            <TouchableOpacity onPress={() => onDelete?.(todo)}>
              <StyledImage
                source={require("../../../assets/images/delete.png")}
                width={20}
                height={20}
                tintColor={ColorPallete.red}
              />
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
  background-color: ${ColorPallete.listCardBack};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  elevation: 3;
  shadow-color: ${ColorPallete.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  max-height: 100px;
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
  border-color: ${ColorPallete.lightGrey};
  font-size: 16px;
  color: ${ColorPallete.black};
  flex-wrap: wrap;
`;

const StyledText = styled(Text)<{ completed: boolean }>`
  font-size: 16px;
  color: ${(props) =>
    props.completed
      ? ColorPallete.todoCompletedText
      : ColorPallete.todoPendingText};
  text-decoration-line: ${(props) =>
    props.completed ? "line-through" : "none"};
  flex-wrap: wrap;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  column-gap: 10px;
  justify-content: flex-end;
  align-items: center;
`;

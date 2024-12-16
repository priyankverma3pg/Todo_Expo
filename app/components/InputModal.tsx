/**
 * InputModal component is a reusable modal that displays an input field and allows the user to submit a value.
 * It has a customizable title, placeholder, and provides actions to confirm or close the modal.
 *
 * @component
 * @param {Object} props - The properties for the InputModal component.
 * @param {boolean} props.visible - Controls the visibility of the modal. Set to `true` to display, `false` to hide.
 * @param {string} props.title - The title to be displayed at the top of the modal.
 * @param {string} [props.placeholder="Enter value"] - The placeholder text for the input field (optional, default is "Enter value").
 * @param {Function} props.onClose - Callback function to be called when the modal is closed (e.g., when the "Cancel" button is pressed).
 * @param {Function} props.onConfirm - Callback function to be called when the "Add" button is pressed, passing the input value as an argument.
 *
 * @example
 * <InputModal
 *   visible={isModalVisible}
 *   title="Add Todo"
 *   placeholder="Enter your task"
 *   onClose={handleCloseModal}
 *   onConfirm={handleAddTodo}
 * />
 */

import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "./CommonStyledComponents";
import { ColorPallete } from "../constants/Colors";

// Props for the InputModal
interface ReusableModalProps {
  visible: boolean;
  title: string;
  placeholder?: string;
  onClose: () => void;
  onConfirm: (inputValue: string) => void;
}

const InputModal: React.FC<ReusableModalProps> = ({
  visible,
  title,
  placeholder = "Enter value",
  onClose,
  onConfirm,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onConfirm(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Backdrop View */}
      <Backdrop>
        <ModalContainer>
          <Text fontSize={20} color="black" padding="0 0 10px 0">
            {title}
          </Text>
          <StyledInput
            placeholder={placeholder}
            onChangeText={setInputValue}
            value={inputValue}
            placeholderTextColor={ColorPallete.todoCompletedText}
            multiline
            numberOfLines={3}
          />
          <ButtonRow>
            <StyledButton
              disabled={inputValue === ""}
              activeOpacity={1}
              onPress={handleAdd}
            >
              <ButtonText>Add</ButtonText>
            </StyledButton>
            <TouchableOpacity
              onPress={() => {
                setInputValue("");
                onClose();
              }}
            >
              <Text fontWeight={500} color={ColorPallete.red}>
                Cancel
              </Text>
            </TouchableOpacity>
          </ButtonRow>
        </ModalContainer>
      </Backdrop>
    </Modal>
  );
};

export default InputModal;

const Backdrop = styled.View`
  flex: 1;
  background-color: ${ColorPallete.modalBackDrop}; /* Transparent dark background */
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  elevation: 5;
`;

const StyledInput = styled.TextInput`
  border: 1px solid ${ColorPallete.lightGrey};
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled ? ColorPallete.grey : ColorPallete.greenBackGround};
  padding: 10px 15px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${ColorPallete.white};
  font-weight: bold;
  font-size: 16px;
`;

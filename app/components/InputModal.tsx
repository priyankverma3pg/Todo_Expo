import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "./Container"; // Assuming Text is from your Container component
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
            placeholderTextColor="#999"
          />
          <ButtonRow>
            <StyledButton disabled={inputValue === ""} activeOpacity={1} onPress={handleAdd}>
              <ButtonText>Add</ButtonText>
            </StyledButton>
            <TouchableOpacity onPress={onClose}>
              <Text  fontWeight={500} color={ColorPallete.red}>Cancel</Text>
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
  background-color: ${(props) => props.disabled ? ColorPallete.grey : ColorPallete.greenBackGround};
  padding: 10px 15px;
  border-radius: 8px;
  align-items: center;

`;

const ButtonText = styled.Text`
  color: ${ColorPallete.white};
  font-weight: bold;
  font-size: 16px;
`;

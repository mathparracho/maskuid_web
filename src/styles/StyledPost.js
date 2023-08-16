import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Isso garante que o conteúdo ocupe pelo menos toda a altura da tela */
  background-color: #242424;
  `;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

export const InputField = styled.textarea`
  font-size: 20px;
  text-align: center;
  width: 90%;
  margin-bottom: 15px;
  color: white;
  font-family: "Montserrat";
  resize: vertical;
  background-color: #242424;
`;

export const SubmitBtn = styled.button`
  background-color: #53118F;
  border-radius: 5px;
  padding: 10px 25px;
  cursor: pointer;
  border: none;
`;

export const SubmitBtnText = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const Logo = styled.img`
  max-width: 130px; /* Define o tamanho máximo do logo */
  height: auto; /* Mantém a proporção original da imagem */
  display: block; /* Ensures centering works */
  margin: 0 auto; /* Center the image horizontally */
`;
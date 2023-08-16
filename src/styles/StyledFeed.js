import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  background-color: #242424;
  padding: 20px;
`;

export const TituloFeed = styled.h2`
text-align: center;
font-size: 18px;
margin-bottom: 18px;
color: white;
margin-top: 16px;
font-family: "Montserrat";
`;

export const Card = styled.div`
width: 100%;
margin-bottom: 20px;
border-radius: 8px;
padding: 18px;
background-color: #fbfaee;
border: 1px solid grey;
box-shadow: 0px 0px 1px purple;
max-width: 600px; /* Set the maximum height for the card */
overflow: auto; /* Add scrollbars if content exceeds the maximum height */
display: block; /* Ensures centering works */
margin: 0 auto; /* Center the image horizontally */
`;

export const Time = styled.span`
font-size: 12px;
margin-bottom: 10px;
align-self: flex-end;
margin-left: auto;
font-family: "Montserrat";
`;

export const Post = styled.p`
text-align: center;
font-size: 18px;
margin-bottom: 18px;
color: #242424;
font-family: "Montserrat";
`;

export const Likes = styled.span`
text-align: center;
font-size: 18px;
font-weight: bold;
`;

export const BottomPost = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
`;

export const Logo = styled.img`
  max-width: 130px; /* Define o tamanho máximo do logo */
  height: auto; /* Mantém a proporção original da imagem */
  display: block; /* Ensures centering works */
  margin: 0 auto; /* Center the image horizontally */
`;

export const Botao = styled.button`
    border-radius: 8px;
    border: transparent;
`;
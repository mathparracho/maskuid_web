import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {
  Logo,
  Container,
  InputField,
  InputWrapper,
  SubmitBtn,
  SubmitBtnText,
} from "../styles/StyledPost";


export const NovoPost = () => {
  const [location, setLocation] = useState(null);
  const [post, setPost] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(userLocation);
          },
          (error) => {
            console.error("Erro ao obter a localização:", error);
          }
        );
      } else {
        console.error("Geolocalização não suportada pelo navegador.");
      }
    };
    getUserLocation();
  }, []); // Executado apenas uma vez ao montar o componente



  const submitPost = () => {
    const url = 'https://maskuidserverteste-rewmb5ojna-rj.a.run.app/post'; // URL do endpoint da API

    const data = {
      lat: location.latitude,
      long: location.longitude,
      message: post,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        window.alert('Segredo postado com sucesso!');
        navigate('/');
      })
      .catch(error => {
        console.error('Erro ao criar post:', error);
      });
  };


  return (
    
    <Container>
      <Logo
        src={require("../assets/icon.png")}
        alt="team"
      />
      <InputWrapper>
        <InputField
          placeholder="O que deseja desmascarar?"
          placeholderTextColor="black"
          rows={4}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </InputWrapper>
      <SubmitBtn onClick={submitPost}>
        <SubmitBtnText>Postar!</SubmitBtnText>
      </SubmitBtn>
    </Container>

      
      


  );
};



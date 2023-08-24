import { useState, useEffect } from "react";
import axios from "axios";
import feed from "../styles/styles.module.css";
import moment from "moment";
import 'moment/locale/pt-br';
import { FaHeart, FaHeartBroken  } from 'react-icons/fa';
import {
  Container,
  TituloFeed,
  Card,
  Time,
  Post,
  Likes,
  BottomPost,
  Logo,
  Botao
} from "../styles/StyledFeed"; // Import from your StyledComponents.js file
import AdsComponent from '../components/AdsComponent';
import Banner from "../components/banner";

const BASE_URL = "https://maskuidserverteste-rewmb5ojna-rj.a.run.app";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(
    JSON.parse(localStorage.getItem("likedPosts")) || []
  );
  const [dislikedPosts, setDislikedPosts] = useState(
    JSON.parse(localStorage.getItem("dislikedPosts")) || []
  );
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    // ... (your getUserLocation and fetching posts logic)

    // Save liked and disliked posts in local storage
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    localStorage.setItem("dislikedPosts", JSON.stringify(dislikedPosts));
  }, [likedPosts, dislikedPosts]);

  useEffect(() => {
    const getUserLocation = () => {
      const options = {
        maximumAge: 0, // Maximum age of cached position: 5 minutes
        timeout: 10000, // Timeout after 10 seconds
        enableHighAccuracy: false, // Request high accuracy position
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            // Requisição POST para enviar a localização e obter a lista de JSON
            const newPost = {
              lat: userLocation.latitude,
              long: userLocation.longitude,
            };

            axios
              .post(`${BASE_URL}/post/getPosts`, newPost) // Substitua "endpoint" pela rota correta
              .then((response) => {
                setPosts(response.data); // Atualiza o estado com a lista de JSON recebida
                setLoading(false);
              })
              .catch((error) => {
                console.error("Erro ao fazer a requisição POST:", error);
                window.alert('Erro com servidor!');
              });
          },
          (error) => {
            console.error("Erro ao obter a localização:", error);
            window.alert('Erro ao detectar localização!');
          },
          options
        );
      } else {
        console.error("Geolocalização não suportada pelo navegador.");
        window.alert('Erro com sua localização!');
      }
    };
    getUserLocation();
  }, []); // Executado apenas uma vez ao montar o componente



const updateDislikes = async (postId, newDislikes) => {
  try {
    const response = await fetch(`${BASE_URL}/post/dislikes/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dislikes: newDislikes }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('Erro ao atualizar os dislikes');
    }
  } catch (error) {
    console.error(error);
  }
};

const handleDislike = (post) => {
  if (likedPosts.includes(post._id)) {
    // O usuário já deu like neste post, não permita dar dislike
    return;
  }

  const updatedPosts = [...posts];
  const index = updatedPosts.findIndex((p) => p._id === post._id);
  if (index >= 0) {
    const updatedPost = { ...updatedPosts[index] };

    if (dislikedPosts.includes(post._id)) {
      // O usuário já deu dislike neste post, remover o dislike
      updatedPost.dislikes -= 1;
      setDislikedPosts((prevDislikedPosts) => prevDislikedPosts.filter((postId) => postId !== post._id));
    } else {
      // O usuário ainda não deu dislike neste post, adicionar o dislike
      updatedPost.dislikes += 1;
      setDislikedPosts((prevDislikedPosts) => [...prevDislikedPosts, post._id]);

      // Certificar que o post não está na lista de likedPosts
      setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((postId) => postId !== post._id));
      
    }
    // Atualizar os dislikes no servidor
    updateDislikes(post._id, updatedPost.dislikes);
    updatedPosts[index] = updatedPost;

    setPosts(updatedPosts);
  }
};

const handleLike = (post) => {
  if (dislikedPosts.includes(post._id)) {
    // O usuário já deu dislike neste post, não permita dar like
    return;
  }

  const updatedPosts = [...posts];
  const index = updatedPosts.findIndex((p) => p._id === post._id);
  if (index >= 0) {
    const updatedPost = { ...updatedPosts[index] };

    if (likedPosts.includes(post._id)) {
      // O usuário já deu like neste post, remover o like
      updatedPost.likes -= 1;
      setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((postId) => postId !== post._id));
    } else {
      // O usuário ainda não deu like neste post, adicionar o like
      updatedPost.likes += 1;
      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, post._id]);
      

      // Certificar que o post não está na lista de dislikedPosts
      setDislikedPosts((prevDislikedPosts) => prevDislikedPosts.filter((postId) => postId !== post._id));
      
    }

    // Atualizar os dislikes no servidor
    updateLikes(post._id, updatedPost.likes);

    updatedPosts[index] = updatedPost;
    setPosts(updatedPosts);
  }
};

const updateLikes = async (postId, newLikes) => {
  try {
    const response = await fetch(`${BASE_URL}/post/likes/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: newLikes }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('Erro ao atualizar os likes');
    }
  } catch (error) {
    console.error(error);
  }
};



const PostItem = ({ post, handleLike, handleDislike, isLiked, isDisliked }) => {
  return (
    <Card>
      <Time>{moment(post.timestamp).fromNow()}</Time>
      <Post>{post.message}</Post>
      <BottomPost>
        <Likes>{post.dislikes}</Likes>
        <Botao onClick={handleDislike}>
          <FaHeartBroken color={isDisliked ? '#53118F' : 'gray'} />
        </Botao>
        <Botao onClick={handleLike}>
          <FaHeart color={isLiked ? '#53118F' : 'gray'} />
        </Botao>
        <Likes>{post.likes}</Likes>
      </BottomPost>
    </Card>
  );
};



  
  return (

    <Container>
      <Logo
        src={require("../assets/icon.png")}
        alt="team"
        className={feed.logo}
      />
      <TituloFeed>Segredos por perto:</TituloFeed>

      


        {loading ? (
        <TituloFeed>Carregando...</TituloFeed>
      ) : (
        <div>
          {posts.length === 0 ? ( // Check if posts array is empty
            <TituloFeed>Nenhum segredo ainda...</TituloFeed>
          ) : (
            <div>
              {[...posts].reverse().map((item, index) => (
                <li key={index}>
                  <PostItem
                    post={item}
                    handleLike={() => handleLike(item)}
                    handleDislike={() => handleDislike(item)}
                    isLiked={likedPosts.includes(item._id)}
                    isDisliked={dislikedPosts.includes(item._id)}
                    // Pass your like/dislike handlers, isLiked, and isDisliked props here
                  />
                </li>
              ))}
            </div>
            
            
          )}
        </div>
      )}
    <Banner></Banner>
    <AdsComponent dataAdSlot='2192186203' />
    </Container>

  );
};

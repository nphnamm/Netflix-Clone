import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import {BsArrowLeft} from "react-icons/bs";
import video from "../assets/video.mp4";
import { useNavigate, useParams } from 'react-router-dom';
import { API_KEY } from '../utils/constants';
import { getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from '../movies'
import { HiChevronLeft } from "react-icons/hi";
import Navbar from './Navbar';
export default function Player() {
    const navigate = useNavigate()

    
    // const { setHeader } = useContext(Contextpage);
    const [moviedet, setMoviedet] = useState([]);
    const { id } = useParams()


    // const fetchMovie = async () => {
    //     const data = await fetch(
    //       `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    //     );
    //     const moviedetail = await data.json();
    //     setMoviedet(moviedetail);
    // };

    //   useEffect(() => {
    //     fetchMovie()
    //     // setHeader("Player")
    //   }, []);
      
    console.log(`https://embed.smashystream.com/playere.php?tmdb=${id}`);
  return (
    
    <Container>
        <Navbar />
            <button onClick={()=>navigate(-1)} className='btn-back'><HiChevronLeft /></button>
        <div className='player'>

            <iframe allowFullScreen style={{  width:"80%", height:"80vh"}} src={`https://embed.smashystream.com/playere.php?tmdb=${id}`}></iframe>
        </div>
    
      </Container>

  )
}
const Container = styled.div`
    .player{
        margin-top: 100px;
        display: flex ;
        justify-content: center;
    }
    .btn-back{
        position: fixed;
        top:50;
        left:145px;
        z-index: 10;
        font-size: 2.5rem; /* 36px */ 

        line-height: 2.5rem; /* 40px */
        color: black;
        background-color: white;
        /* margin: 0.75rem; */
        
        border-radius: 10%;
        &:hover{
            background: #ccc;
        }
        

    }

`;

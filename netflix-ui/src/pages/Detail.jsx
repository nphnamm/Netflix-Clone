import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import MovieLogo from '../assets/homeTitle.webp';
import { FaCloudDownloadAlt, FaHeart, FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { fetchMovies, getMovieById } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';

export default function Detail() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.netflix.movie);
    const movies = useSelector((state) => state.netflix.movies);
    const [play, setPlay] = useState(false);

    
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
    const {id} = useParams();
    useEffect(() => {
        dispatch((getMovieById(id)))
         dispatch(fetchMovies({ type: "all" }))
    }, [])
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) { navigate("/login") }
        else {
          // toast.success('Login Sucessfully', {
          //   position: "top-right", // Optional: Toast position
          //   autoClose: 5000,  // Optional: Auto-close in milliseconds
          //   hideProgressBar: false, // Optional: Hide progress bar
          //   closeOnClick: true,   // Optional: Close on click
          //   pauseOnHover: true,   // Optional: Pause on hover
          //   draggable: true,     // Optional: Make toast draggable
          //   theme: "light",    // Optional: Theme (light or dark)
          // });
        };
      });
      // console.log('check id', id);
      // console.log('check movie', movies);
      const _id = Number(id);
      const _movie = movies.filter(movie => movie.id === _id);
    console.log('check filter array', _movie[0]);

    return (
    <Container>
      <Navbar isScrolled={isScrolled}/>
      <div className="hero">
        <div className='poster'>
          <img src={`https://image.tmdb.org/t/p/original/${_movie[0].poster}`} alt="background" className="background-image" />

        </div>
        <div className="container">
          <div className="description">
          <h1 className='title'>{_movie[0].name}</h1>

            {/* <img src={MovieLogo} alt="Movie Logo" /> */}
            <p>{_movie[0].description}</p>

          </div>
          <div className='buttons flex'>
            <button className='flex j-center a-center'>
              <Link  to={`/player/${id}`}>
              <FaPlay />       
              </Link>
           

            </button>
            <button className='flex j-center a-center'>
              <AiOutlineInfoCircle />More Info
            </button>

          </div>
        </div>

      </div>




    </Container>
  )
}
const Container = styled.div`

  .hero{
    position: relative;
    .background-image{
      filter: brightness(40%);

    }
    .poster{
      height: 100vh;
      width: 100vw;
      img{
      height: 150%;
      width: 100%;
      object-fit: fill;
    }


      

    }
    .container{
      position: absolute;
      bottom: 5rem;
      .title{
        font-size: 54;
        font-weight: 900;

      }

      .description{
        margin-left: 5rem;
        

        height: 200px;
        width: 600px;
        h1{

        }
        p{
          font-size: 20px;
          color: #ccc;
        }
        /* border: 1px solid red; */
      }
      .buttons{
          margin: 3rem 5rem;
          gap: 2rem;
          button{
            font-size: 1.4rem;
            gap: 1rem;
            border-radius: 0.2rem;
            padding: 0.5rem;
            padding-left: 2rem;
            padding-right: 2.4rem;
            border: none;
            &:hover{
              opacity:0.8;
            }
            &:nth-of-type(2){
              background-color: rgba(109,109,110,0.7);
              color:white;
              svg{
                font-size: 1.8rem;
              }
            }

        }
      }
    }
  }
  
`;
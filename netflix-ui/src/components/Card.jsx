import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch } from 'react-redux';
import { removeFromLikedMovie } from '../store';
import { toast, ToastContainer } from "react-toastify";
import { FaPlay } from 'react-icons/fa';

export default React.memo(function Card({ index, movieData, isLiked = false }) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState(undefined);
    const dispatch = useDispatch();
    
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            // console.log('check user',currentUser);
            setEmail(currentUser.email);

        } else {
            navigate("/login");
        }

    })
    const addToList = async () => {
        try {
            const result = await axios.post("http://localhost:5000/api/user/add", { email, data: movieData });
            if (result.status === 200) {
                toast.success('Add Movie Sucessfully', {
                    position: "top-right", // Optional: Toast position
                    autoClose: 5000,  // Optional: Auto-close in milliseconds
                    hideProgressBar: false, // Optional: Hide progress bar
                    closeOnClick: true,   // Optional: Close on click
                    pauseOnHover: true,   // Optional: Pause on hover

                    draggable: true,     // Optional: Make toast draggable
                    theme: "light",    // Optional: Theme (light or dark)
                });
            }
            console.log('check ', result);


        } catch (err) {
            console.log(err);
        }
    }
    const removeFromList = () => {

        const result = dispatch(removeFromLikedMovie({ movieId: movieData.id, email }));

        console.log('check result: ', result.payload);
        result
            .then(value => {
                // Promise fulfilled
                const statusErr = value.payload.data;
                console.log("Promise fulfilled with value:", statusErr);
                if (value.payload.status === 200) {
                    toast.success('Login Sucessfully', {
                        position: "top-right", // Optional: Toast position
                        autoClose: 5000,  // Optional: Auto-close in milliseconds
                        hideProgressBar: false, // Optional: Hide progress bar
                        closeOnClick: true,   // Optional: Close on click
                        pauseOnHover: true,   // Optional: Pause on hover
                        draggable: true,     // Optional: Make toast draggable
                        theme: "light",    // Optional: Theme (light or dark)
                    });
                }
            })
            .catch(reason => {
                // Promise rejected
                console.error("Promise rejected with reason:", reason);
            });
    }
    const handlePlayClick = () => {
        // Pass movie data to Detail component using useNavigate
        const propsMovie = movieData;
        navigate('/detail', { propsMovie });
    };
    //console.log('check movie data:', movieData.id);
    return (
        <Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt='Movie Poster' />
            {
                isHovered && (
                    <div className='hover'>
                        <div className='image-video-container'>
                            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`}

                                alt='movie'
                                onClick={() => navigate("/player")}
                            />
                       



                        </div>
                        <div className='info-container flex column'>
                            <h3 className='name' onClick={() => handlePlayClick()}>
                                {movieData.name}
                            </h3>
                            <div className="icons flex j-between">
                                <div className="controls flex">
                                <Link  to={`/detail/${movieData.id}`} className=''>
                                    <FaPlay />
                                </Link>
                                    <RiThumbUpFill title='Like' />
                                    <RiThumbDownFill title='Dislike' />
                                    {isLiked ? (
                                        <BsCheck title='Remove From List' onClick={() => removeFromList()} />
                                    ) : (
                                        <AiOutlinePlus title='Add to my list' onClick={addToList} />
                                    )}


                                </div>
                                <div className='info'>
                                    <BiChevronDown title='More Info' />
                                </div>
                            </div>
                            <div className="genres flex">
                                <ul className="flex">
                                    {movieData.genres.map((genre) => (
                                        <li key={genre}>{genre}</li>
                                    ))}
                                </ul>

                            </div>

                        </div>

                    </div>


                )
            }

        </Container>
    )
})
const Container = styled.div`
    max-width: 230px;
    width:230px;
    height: 100%;
    cursor: pointer;
    position: relative;
    img{
        border-radius: 0.2rem;
        width: 100%;
        height: 100%;
        z-index: 10;

    }
    .hover{
        z-index: 90;
        height: max-content;
        width: 20rem;
        position: absolute;
        top:-18vh;
        left:0;
        border-radius: 0.3rem;
        box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
        background-color: #181818;
        transition: 0.3 ease-in-out;
        .image-video-container{
            position: relative;
            height: 140px;
            img{
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top:0;
                z-index: 4;
                position: absolute;

            }
            video{
                width: 100%;
                height: 140px;
                object-fit:cover;
                border-radius:0.3rem;
                top:0;
                z-index:5;
                position: absolute;
            }         
        }
        .info-container{
                padding: 1rem;
                gap: 0.5rem;

        }
        .icons{
            .controls{
            display: flex;
            gap:1rem;

            }
            svg{
                font-size: 2rem;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover{
                    color: #b8b8b8;

                }
            }
            }
        .genres{
            ul{
                gap:1rem;
                li{
                    padding-right: 0.7rem;
                    &:first-of-type{
                        list-style-type: none;
                    }
                }
            }
        }
    }
`

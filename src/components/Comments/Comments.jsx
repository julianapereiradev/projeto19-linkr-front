import { useContext, useEffect, useState } from "react";
import { backendroute } from "../../routes/routes";
import { styled } from "styled-components";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import { headersAuth } from "../../constants/functions";
import { IoPaperPlaneOutline } from "react-icons/io5";


export default function Comments({ commentstate, postId, isRepost, whoPosted, setTotalComments }) {

    const { user } = useContext(AuthContext)
    const [text, setText] = useState('')
    const [comments, setComments] = useState()
    const [lever, setLever] = useState(false)
    const [following, setFollowing] = useState([])

    useEffect(() => {
        const promiseComents = axios.get(
            backendroute.getComments + postId + '/comments'
        )

        promiseComents.then((res) => {
            setComments(res.data)
        })
        promiseComents.catch((err) => {
            alert(err.response.data)
        })

        const promiseFollows = axios.get(
            backendroute.getFollowing + user.lastuserId
        )

        promiseFollows.then((res) => {
            setFollowing(res.data)

        })
        promiseFollows.catch((err) => {
            alert(err.response.data)
        })


    }, [lever, user])

    function createComment(e) {
        e.preventDefault()
        const body = { comment: text }
        const promise = axios.post(
            backendroute.createComment + postId + '/comment', body, headersAuth(user.token))

        promise.then(() => {
            const promiseComments = axios.get(
                backendroute.getComments + postId + '/comments'
            )
            promiseComments.then((res) => {
                setTotalComments(res.data.length)
            })
            setLever(!lever)
            setText('')

        })
        promise.catch(err => {
            alert(err.response.data)
        })
    }

    
    return (
        <>
            {commentstate ? (
                <CommentsContainer data-test="comment-box" >
                    <ContainerScroller>
                        {!comments ? '' :
                            (comments.map(c =>
                                <Comment data-test="comment" key={c.id}>
                                    <img src={c.pictureUrl} alt="" />

                                    <div>
                                        <h4>
                                            <span>
                                                {c.author}
                                            </span>
                                            <p> {whoPosted === c.userId ? `• post's author` : ''}</p>
                                            <p> {following.includes(c.userId) ? `• following` : ''}</p>
                                        </h4>
                                        <p>{c.comment}</p>
                                    </div>
                                </Comment>
                            ))
                        }
                    </ContainerScroller>
                    {isRepost ?
                        <WriteComment onSubmit={createComment}>
                            <img src={user ? user.pictureUrl : ''} alt="" />
                            <input
                                data-test="comment-input"
                                type="text"
                                placeholder="write a comment..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                            />
                            <ButtonSend data-test="comment-submit" type="submit">
                                <IconSendComment />
                            </ButtonSend>
                        </WriteComment>
                        : ''
                    }
                </CommentsContainer>
            ) : ''}

        </>
    )
}

const CommentsContainer = styled.div`
    display: "flex";

    flex-direction: column;
    width: 611px;
    margin: 0 auto;

    position: relative;
    top: -45px;

    border-radius: 16px;

    background-color: #1E1E1E;
    `

const ContainerScroller = styled.div`
max-height: 200px;   

margin-top: 30px;
overflow-y: auto;
overflow-x: hidden;
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    background: #1E1E1E; 
}    
&:hover {
    ::-webkit-scrollbar-thumb {
        background: #575757; 
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #1877f2; 
    }
}

`;

const Comment = styled.div`
    border-bottom: 1px solid #353535;

    display: flex;
    align-items: center;

    font-size: 14px;

    font-family: 'Lato', sans-serif;
    line-height: 17px;
    padding: 15px 0 15px 0;

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin: 0 6px 0 33px;

        object-fit: cover;
    }
    h4 {
        color: #F3F3F3;
        font-weight: bold;
        max-width: 510px;
        word-break: break-word;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        gap: 5px;
        p {
            color: #565656;
        }
    }
    span {
        color: #fff;
    
        
    }
    p {
        color: #ACACAC;
        max-width: 510px;
        word-break: break-word;


    }
    div {
        margin-left: 15px;
    }


`
const WriteComment = styled.form`
     height: 83px;
    width: 95%;
    padding-left: 33px;

    position: relative;
    display: flex;
    align-items: center;

    input {
        width: 600px;
        padding: 0 40px 0 11px;
        height: 39px;
        background-color: #252525;
        border-radius: 8px;
        color: #ACACAC;
    }

    input::placeholder {
        color: #575757;
        padding-left: 10px;
    }

    input:focus {
        outline: 0;
    }

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 18px;

        object-fit: cover;
    }
`

const ButtonSend = styled.button`
    background-color: transparent;
    position: absolute;
    top: 6px;
    right: 5px;
`

const IconSendComment = styled(IoPaperPlaneOutline)`
    color: #F3F3F3;

    width: 18px;
    height: 18px;

    &:hover {
    cursor: pointer;
    color: #1877f2;
  }   
`

import { useEffect, useState, useContext, useRef } from "react";
import { styled } from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { backendroute, pages } from "../../routes/routes";
import { headersAuth } from "../../constants/functions";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import reactStringReplace from "react-string-replace";
import NoImage from "../../assets/noimage2.png";
import { TbTrashFilled } from "react-icons/tb";
import Modal from "react-modal";
import {  ThreeDots } from "react-loader-spinner";
import Pen from "../../assets/pen.png";
import { IoChatbubblesOutline } from "react-icons/io5";
import Comments from "../Comments/Comments";

export default function PostBox({ post }) {
  const { user } = useContext(AuthContext);

  const [selected, setSelected] = useState(false);
  const [urlMetadataInfo, setUrlMetadataInfo] = useState(null);
  const [postLikes, setPostLikes] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const textInputRef = useRef(null);
  const [changesMade, setChangesMade] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [commentstate, setCommentState] = useState(false);

  const navigate = useNavigate();

  function openUrlId(userId) {
    navigate(pages.userPosts + userId);
  }

  
/*   const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        const id = setInterval(tick, delay);

        return () => clearInterval(id);
      }
    }, [delay]);
  };

const checkForNewPosts = () => {

const serverResponse = { newPostCount: Math.floor(Math.random() * 5) }; 

const newPostsCountFromServer = serverResponse.newPostCount;

if (newPostsCountFromServer > 0) {
  setNewPostCount(newPostsCountFromServer);
  setShowNewPostsButton(true); 
}
};

useInterval(() => {
checkForNewPosts();
}, 15000);

const handleShowNewPosts = () => {

setNewPostCount(0);
setShowNewPostsButton(false);
};

 */

  const fetchUrlMetadata = async (url) => {
    try {
      const response = await axios.get(
        `https://jsonlink.io/api/extract?url=${url}`
      );
      setUrlMetadataInfo(response.data);
    } catch (error) {
      console.error("Error fetching URL metadata:", error);
    }
  };

  useEffect(() => {
    const promiseLikes = axios.get(backendroute.getlikes + post.id, headersAuth(user.token));
    promiseLikes.then((res) => {
      setPostLikes(res.data);
    });

    if (post.url) {
      fetchUrlMetadata(post.url);
    }
  }, [post.id, post.url, user]);


  const startEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 0);
  };

  const handleCancelEdit = () => {
    if (changesMade) {
      const confirmDiscard = window.confirm("Descartar alterações não salvas?");
      if (confirmDiscard) {
        setIsEditing(false);
        setChangesMade(false);
        setEditedContent(post.content);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleSaveEdit = async () => {
    axios
      .put(
        backendroute.updatePostById + post.id,
        { content: editedContent },
        headersAuth(user.token)
      )
      .then((response) => {
        setIsEditing(false);
        setChangesMade(false);
        setEditedContent(response.data.content);
        console.log("Post atualizado com sucesso:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.response.data);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancelEdit();
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    }
  };

  useEffect(() => {
    const promiseLikes = axios.get(
      backendroute.getlikes + post.id,
      headersAuth(user.token)
    );
    promiseLikes.then((res) => {
      setPostLikes(res.data);
    });

    const promiseComents = axios.get(
      backendroute.getComments + post.id + '/comments'
    );
    promiseComents.then(res => {
      setTotalComments(res.data.length)
    });
    promiseComents.catch(err => {
      console.log(err.response.data)
    });


    if (post.url) {
      fetchUrlMetadata(post.url);
    }
  }, [selected, post.id, post.url, user]);

  if (!postLikes) {
    return (
      <Load>
        <ThreeDots color="#FFFFFF" height={50} width={50} />
      </Load>
    );
  }

  function like() {
    const promiseUser = axios.get(
      backendroute.getDataUserByToken,
      headersAuth(user.token)
    );
    promiseUser.then((res) => {
      const body = {
        userId: res.data[0].userId,
        postId: post.id,
      };
      const promise = axios.post(
        backendroute.likes,
        body,
        headersAuth(user.token)
      );
      promise.then((res) => {
        setSelected(!selected);
      });
      promise.catch((err) => {
        alert(err.response.data);
      });
    });
    promiseUser.catch((err) => {
      alert(err.response.data);
    });
  }

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const removeItem = async (postId) => {
    try {
      setIsLoading(true);
      const headers = headersAuth(user?.token);
      await axios.delete(backendroute.deletePostById + postId, headers);
      setShowDeleteModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error em deletar Item front:", error.response.data);
      setShowDeleteModal(false);
      alert(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const trashIconClicked = (postId) => {
    removeItem(postId);
  };

  function showComments() {
      setCommentState(!commentstate)
  }

  return (
    <>
      <Container data-test="post">
        <ContainerLike>
          <ContainerPhoto>
            <UserImage
              onClick={() => openUrlId(post.userId)}
              src={post.pictureUrl}
              alt="Usuário"
            />
          </ContainerPhoto>
          <Icon>
            <LikeTooltip>
              {postLikes[0].isLiked ? (
                <FaHeart
                  data-test="like-btn"
                  color="#AC0000"
                  size={20}
                  onClick={() => like()}
                />
              ) : (
                <FiHeart
                  data-test="like-btn"
                  color="#fff"
                  size={20}
                  onClick={() => like()}
                />
              )}
              <a data-tooltip-id={String(post.id)} data-tooltip-place="bottom">
                <SCQntLikes data-test="counter">
                  {postLikes[0].count} likes
                </SCQntLikes>
              </a>
              <SCTooltip
                id={String(post.id)}
                style={{ backgroundColor: "#fff" }}
              >
                <SCTooltipText data-test="tooltip">
                  {postLikes[0].whoLiked}
                </SCTooltipText>
              </SCTooltip>
            </LikeTooltip>
          </Icon>
          <CommentContainer>
            <IoChatbubblesOutline
              data-test="comment-btn"
              size={20}
              color="ffffff"
              onClick={() => showComments()}
            />
          </CommentContainer>

          <SCQntLikes data-test="comment-counter">
            {totalComments} comments
          </SCQntLikes>
        </ContainerLike>

        <ContainerContent>
          <ContainerTrashRow>
            <Username
              data-test="username"
              onClick={() => openUrlId(post.userId)}
            >
              {post.username}
            </Username>
            <PenTrashContainer>
              {post.userId === user.lastuserId && (
                <PenContainer
                  data-test="edit-btn"
                  src={Pen}
                  alt="pen"
                  onClick={isEditing ? handleCancelEdit : startEditing}
                />
              )}

              {post.userId === user.lastuserId && (
                <ButtonTrash data-test="delete-btn" onClick={openDeleteModal}>
                  <TbTrashFilled color="#FFFFFF" size="25" />
                </ButtonTrash>
              )}

            </PenTrashContainer>
          </ContainerTrashRow>

          <Modal
            isOpen={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
            style={{
              overlay: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              },
              content: {
                color: "#FFFFFF",
                background: "#333333",
                fontFamily: "Lato",
                fontWeight: "bold",
                fontSize: "34px",
                width: "597px",
                height: "250px",
                borderRadius: "50px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              },
            }}
          >
            <DivInsideModal>
              <h2 style={{ textAlign: "center" }}>
                Are you sure you want to delete this post?
              </h2>
              <ButtonsModal>
                <ButtonNo
                  data-test="cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  No, go back
                </ButtonNo>
                <ButtonYes
                  data-test="confirm"
                  onClick={() => trashIconClicked(post.id)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ThreeDots
                      type="ThreeDots"
                      color="#000000"
                      height={20}
                      width={50}
                    />
                  ) : (
                    "Yes, delete it"
                  )}
                </ButtonYes>
              </ButtonsModal>
            </DivInsideModal>
          </Modal>

          <Text data-test="description">
            {isEditing ? (
              <textarea
                data-test="edit-input"
                ref={textInputRef}
                value={editedContent}
                onChange={(e) => {
                  setEditedContent(e.target.value);
                  setChangesMade(true);
                }}
                onBlur={handleCancelEdit}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
            ) : (
              reactStringReplace(
                post.content,
                /(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)/g,
                (match, i) => (
                  <span onClick={() => navigate(`/hashtag/${match}`)}>
                    #{match}
                  </span>
                )
              )
            )}
          </Text>
          {post.url && urlMetadataInfo && (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              data-test="link"
            >
              <ContainerLink>
                <ContainerDetails>
                  {urlMetadataInfo && (
                    <>
                      <LinkTitle>{urlMetadataInfo.title}</LinkTitle>
                      <LinkDescription>
                        {urlMetadataInfo.description}
                      </LinkDescription>
                      <Link>{post.url}</Link>
                    </>
                  )}
                </ContainerDetails>
                <ContainerImage>
                  {urlMetadataInfo &&
                    urlMetadataInfo.images &&
                    urlMetadataInfo.images.length > 0 ? (
                    <LinkImage src={urlMetadataInfo.images[0]} alt="metadata" />
                  ) : (
                    <LinkImage src={NoImage} alt="metadata" />
                  )}
                </ContainerImage>
              </ContainerLink>
            </a>
          )}
        </ContainerContent>
      </Container>
      <Comments
        setTotalComments={setTotalComments}
        commentstate={commentstate}
        postId={post.id}
        isRepost={user.username}
        whoPosted={post.userId}
      />
    </>
  );
}

const PenTrashContainer = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;
const PenContainer = styled.img`
  width: 23px;
  height: 23px;
`;

const ContainerDetails = styled.div`
  width: 302px;
`;

const LinkImage = styled.img`
  width: 153px;
  height: 153px;
  border-radius: 0px 10px 10px 0px;
`;

const ContainerImage = styled.div`
  width: 155px;
  height: 155px;
  border-radius: 0px 12px 13px 0px;
  padding-left: 5px;
`;

const LinkDescription = styled.p`
  font-family: Lato;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: #9b9595;
  margin-top: 10px;
  margin-left: 15px;
  @media(max-width: 600px) {
    font-size: 8px;
  }
`;

const LinkTitle = styled.p`
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #cecece;
  margin-top: 20px;
  margin-left: 15px;
  @media(max-width: 600px) {
    font-size: 12px;
  }
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 27px;
`;

const ContainerPhoto = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 27px;
  margin: 16px;
  padding: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Icon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ContainerTrashRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  a {
    text-decoration: none;
  }
`;

const Container = styled.div`
  width: 611px;
  height: 276px;
  background-color: #151515;
  border-radius: 20px;
  display: flex;
  margin-bottom: 15px;
  @media (max-width: 600px) {
    width: 100%; 
    border-radius: 0px;
  }
`;

const Text = styled.text`
  font-family: Lato;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #b7b7b7;
  margin-top: 10px;
  margin-bottom: 16px;
  span {
    font-weight: 900;
  }
`;

const Username = styled.text`
  font-family: Lato;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
`;

const Link = styled.div`
  margin-left: 15px;
  margin-top: 18px;
  color: #cecece;
  font-family: Lato;
  font-size: 11px;
  font-weight: 400;
  @media(max-width: 600px) {
    font-size: 7px;
  }

`;

const ContainerLink = styled.div`
  width: 503px;
  height: 155px;
  border: 0.5px solid white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  @media(max-width: 600px) {
    width: 90%
  }
`;

const DivInsideModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const ButtonsModal = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;

  button {
    height: 37px;
    width: 134px;
    margin-left: 30px;
  }
`;

const ButtonNo = styled.button`
  background-color: #ffffff;
  color: #1877f2;
`;

const ButtonYes = styled.button`
  background-color: #1877f2;
  color: #ffffff;
`;

const ButtonTrash = styled.button`
  width: 25px;
  height: 25px;
  background-color: #151515;
`;

const LikeTooltip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Load = styled.div`
  align-self: center;
  display: flex;
`;

const SCQntLikes = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 11;
  color: #fcfcfc;
`;

const SCTooltip = styled(Tooltip)`
  box-shadow: 0px 4px 4px 0px #000;
  width: 160px;
  height: 24px;
  opacity: 0.9;
  background-color: #fff;

  display: flex;
  align-items: center;
`;

const SCTooltipText = styled.p`
  font-family: "Lato";
  font-weight: 700;
  font-size: 11;
  color: black;
  text-align: center;
`;
const CommentContainer = styled.div`
     display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    cursor: pointer;
 `
import { useEffect, useState, useContext, useRef } from "react";
import { styled } from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { backendroute, pages } from "../../routes/routes";
import { headersAuth } from "../../constants/functions";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import reactStringReplace from 'react-string-replace';
import NoImage from "../../assets/noimage2.png";
import { TbTrashFilled } from "react-icons/tb";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import Pen from "../../assets/pen.png";

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

  const navigate = useNavigate();

  function openUrlId(userId) {
    navigate(pages.userPosts + userId);
  }

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

  const startEditing = () => {
    setIsEditing(true);
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
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

  const handleSaveEdit = async (postId) => {
    axios
      .put(backendroute.updatePostById + postId, { content: editedContent }, headersAuth(user.token))
      .then((response) => {
        setIsEditing(false);
        setChangesMade(false);
        setEditedContent(response.data.content);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o post:", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSaveEdit(); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  useEffect(() => {
    const promiseLikes = axios.get(backendroute.getlikes + post.id, headersAuth(user.token))
    promiseLikes.then((res) => {
      setPostLikes(res.data)
    })

    if (post.url) {
      fetchUrlMetadata(post.url);
    }
  }, [selected, post.id, post.url, user])

  if (!postLikes) {
    return <Load><ThreeDots color="#FFFFFF" height={50} width={50} /></Load>
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
            <LikeTooltip >
              {postLikes[0].isLiked ? (
                <FaHeart color="#AC0000" size={20} onClick={() => like()} />
              ) : (
                <FiHeart color="#fff" size={20} onClick={() => like()} />
              )}
              <a data-tooltip-id={String(post.id)} data-tooltip-place="bottom">
                <SCQntLikes>{postLikes[0].count} likes</SCQntLikes>
              </a>
              <SCTooltip id={String(post.id)} style={{ backgroundColor: "#fff" }}>
                <SCTooltipText>{postLikes[0].whoLiked}</SCTooltipText>
              </SCTooltip>
            </LikeTooltip>
          </Icon>
        </ContainerLike>

        <ContainerContent>
          <ContainerTrashRow>
            <Username onClick={() => openUrlId(post.userId)}>
              {post.username}
            </Username>
            <PenTrashContainer>
              <PenContainer src={Pen} alt="pen" onClick={isEditing ? handleCancelEdit : startEditing}/>
              <ButtonTrash data-test="delete-btn" onClick={openDeleteModal}><TbTrashFilled
                color="#FFFFFF"
                size="25"
              /></ButtonTrash>
            </PenTrashContainer>
          </ContainerTrashRow>

          <Modal
            isOpen={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
            style={{
              overlay: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
            }}
          >
            <DivInsideModal>
              <h2 style={{ textAlign: 'center' }}>Are you sure you want to delete this post?</h2>
              <ButtonsModal>
                <button data-test="cancel" onClick={() => setShowDeleteModal(false)}>
                  No, go back
                </button>
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

          <Text>
            {isEditing ? (
              <textarea
                ref={textInputRef}
                value={editedContent}
                onChange={(e) => {
                  setEditedContent(e.target.value);
                  setChangesMade(true);
                }}
                onBlur={handleCancelEdit}
                onKeyPress={handleKeyPress}
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

          {post.url && (
            <a href={post.url} target="_blank" rel="noopener noreferrer">
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
    </>
  );
}

const PenTrashContainer = styled.div``;
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
  padding-left: 10px;
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
`;

const ContainerLink = styled.div`
  width: 503px;
  height: 155px;
  border: 0.5px solid white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
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

const ButtonYes = styled.button`
background-color: #FFFFFF;
color: #1877F2;
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
    font-family: "Lato";
    font-weight: 400;
    font-size: 11;
    color: black;
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
import { useEffect, useState, useContext } from "react";
import { styled } from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { backendroute, pages } from "../../routes/routes";
import { headersAuth } from "../../constants/functions";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NoImage from "../../assets/noimage2.png";
import reactStringReplace from "react-string-replace";
import { TbTrashFilled } from "react-icons/tb";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";

export default function PostBox({ post }) {
  const { user } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(false);
  const [urlMetadataInfo, setUrlMetadataInfo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function openUrlId(userId) {
    navigate(pages.userPosts + userId);
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

  function like(p) {
    if (!isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    const body = {
      userId: p.userId,
      postId: p.id,
    };

    const promise = axios.post(
      backendroute.likes,
      body,
      headersAuth(user.token)
    );
    promise.then((res) => {
      console.log(res.data);
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
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

  useEffect(() => {
    if (post.url) {
      fetchUrlMetadata(post.url);
    }
  }, [post.url]);

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

          {isLiked ? (
            <FiHeart size="27" color="#FFF" onClick={() => like(post)} />
          ) : (
            <FaHeart size="27" color="#AC0000" onClick={() => like(post)} />
          )}
        </ContainerLike>

        <ContainerContent>
          <ContainerTrashRow>
            <Username onClick={() => openUrlId(post.userId)}>
              {post.username}
            </Username>
            <ButtonTrash data-test="delete-btn" onClick={openDeleteModal}><TbTrashFilled
              color="#FFFFFF"
              size="25"
            /></ButtonTrash>
            
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
            <h2 style={{textAlign: 'center'}}>Are you sure you want to delete this post?</h2>
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
            {reactStringReplace(
              post.content,
              /(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)/g,
              (match, i) => (
                <span onClick={() => navigate(`/hashtag/${match}`)}>
                  #{match}
                </span>
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

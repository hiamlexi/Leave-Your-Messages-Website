import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FaCamera } from "react-icons/fa";
import ImageUpload from "../components/ImageUpload";
const Section = styled.div`
  height: 100%;
  scroll-snap-align: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh; 
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 100%; 
    height: auto;
    padding: 20px 0;
  }
`;

const Right = styled.div`
  flex: 1;

  @media only screen and (max-width: 768px) {
    width: 100%; 
    height: auto;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  max-height: 90vh; 
  background: linear-gradient(#212121, #212121) padding-box,
    linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 24px;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  overflow-y: auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    color: #717171;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 12px;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    background-color: transparent;
    border: 1px solid #414141;
    resize: none;

    &:focus {
      outline: none;
      border-color: #e81cff;
    }
  }

  textarea {
    height: 80px;
  }

  input::placeholder {
    opacity: 0.5;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 25px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  background: linear-gradient(135deg, #3a8ffe 0%, #9658fe 100%);
  margin-top: 12px;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
  align-self: center;
`;

const Circle = styled.div`
  border-radius: 100%;
  overflow: hidden;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PImage = styled.div`
  position: absolute;
  top: 75px;
  right: -10px;
  color: #666666;

  &:hover {
    color: #999;
  }

  @media only screen and (max-width: 768px) {
    right: 0;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadButton = styled(FaCamera)`
  font-size: 1.2em;
  cursor: pointer;
`;


const MessagePage = (props) => {
  const [imageFile, setImageFile] = useState(null);
  const ref = useRef();
  const fileInputRef = useRef();
  const imageRef = useRef();
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = ref.current;
    const formData = new FormData(form);

    const avatarFile = fileInputRef.current.files?.[0];
    if (avatarFile) formData.append("avatar", avatarFile);

    if (imageFile) formData.append("picture", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("Successfully sent message");
        setSuccess(true);
        form.reset();
        setImageFile(null);
        //temp img and avatar
        imageRef.current.src =
          "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
      } else {
        console.error("❌ Failed to send message. Server responded with:", res.status);
        setSuccess(false);
      }
    } catch (err) {
      console.error("❌ Network error while sending message:", err);
      setSuccess(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      imageRef.current.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Section id={props.id}>
      <Container>
        <Right>
          <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.16/build/spline-viewer.js"></script>
          <spline-viewer url="https://prod.spline.design/qz7jXPY0lbS73OXP/scene.splinecode"></spline-viewer>
        </Right>
        <Left>
          <FormContainer>
            <StyledForm ref={ref} onSubmit={handleSubmit}>
              <ProfileWrapper>
                <Circle>
                  <ProfilePic
                    ref={imageRef}
                    src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                    alt="Profile"
                  />
                </Circle>
                <PImage>
                  <UploadButton onClick={triggerFileSelect} />
                  <HiddenFileInput
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </PImage>
              </ProfileWrapper>

              <FormGroup>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="textarea">Drop me a wish!</label>
                <textarea
                  name="textarea"
                  id="textarea"
                  placeholder="Write your message here or give the duck a little boop for a surprise :D..."
                  required
                ></textarea>
              </FormGroup>

              <FormGroup>
                <ImageUpload onFileSelect={setImageFile} />              
                 </FormGroup>

              <SubmitButton type="submit">Submit</SubmitButton>
              {success === true && (
                <p style={{ color: "#40c9ff", fontSize: "13px" }}>
                   Your message has been sent successfully!
                </p>
              )}
              {success === false && (
                <p style={{ color: "#ff4d4d", fontSize: "13px" }}>
                  Failed to send your message. Please try again.
                </p>
              )}

            </StyledForm>
          </FormContainer>
        </Left>
      </Container>
    </Section>
  );
};

export default MessagePage;

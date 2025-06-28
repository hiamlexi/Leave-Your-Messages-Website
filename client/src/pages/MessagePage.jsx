import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FaCamera } from "react-icons/fa";
import ImageUpload from "../components/ImageUpload"

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;

  @media only screen and (max-width: 768px) {
    min-height: 100vh;
    height: auto;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;

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
 overflow-y: visible;
max-height: unset;
  @media only screen and (max-width: 768px) {
    height: 40%;
    padding-top: 20px;
  }
`;

const Right = styled.div`
  flex: 1;
  height: 100%;

  @media only screen and (max-width: 768px) {
    height: 50%;
  }
`;

// === Form ===
const FormContainer = styled.div`
  width: 400px;
  background: linear-gradient(#212121, #212121) padding-box,
    linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 16px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
 overflow-y: visible;
max-height: unset;

  label {
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid #414141;
    resize: none;

    &:focus {
      outline: none;
      border-color: #e81cff;
    }
  }

  textarea {
    height: 96px;
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
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  background: linear-gradient(135deg, #3a8ffe 0%, #9658fe 100%);
  margin-top: 16px;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.97);
  }
`;


// === Profile Image Upload ===
const ProfileWrapper = styled.div`
  position: relative;
  align-self: center;
`;

const Circle = styled.div`
  border-radius: 100%;
  overflow: hidden;
  width: 128px;
  height: 128px;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const ProfilePic = styled.img`
  width: 128px;
  height: 128px;
  object-fit: cover;
  display: block;
`;

const PImage = styled.div`
  position: absolute;
  top: 90px;
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

const UploadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  overflow: hidden;

  & > * {
    max-width: 100%;
    max-height: 200px;
  }
`;



const MessagePage = () => {
  const ref = useRef();
  const fileInputRef = useRef();
  const imageRef = useRef();
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
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
    <Section>
      <Container>
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
                  rows="10"
                  cols="50"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </FormGroup>
  <ImageUpload />
              <SubmitButton type="submit">Submit</SubmitButton>
              {success && (
                <p style={{ color: "#40c9ff", fontSize: "13px" }}>
                  Your message has been sent successfully!
                </p>
              )}


            </StyledForm>
          </FormContainer>
        </Left>
        <Right>
          <div style={{ width: "100%", height: "100%" }}>

<iframe src='https://my.spline.design/violentbirthdaychick-VLBA2VIBdhddjVf2Zh71a84v/' frameborder='0' width='100%' height='100%'></iframe>          </div>
        </Right>
      </Container>
    </Section>
  );
};

export default MessagePage;

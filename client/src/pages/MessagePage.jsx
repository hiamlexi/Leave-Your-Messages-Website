import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
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

  @media only screen and (max-width: 768px) {
    height: 50%;
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
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  font-family: inherit;
  color: #717171;
  font-weight: 600;
  width: 40%;
  background: #313131;
  border: 1px solid #414141;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: #fff;
    border-color: #fff;
  }

  &:active {
    scale: 0.95;
  }
`;

const MessagePage = () => {
  const ref = useRef();
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add submission logic here
    setSuccess(true);
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
            <spline-viewer
              url="https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode"
              events-target="local"
              style={{ width: "100%", height: "100%" }}
            ></spline-viewer>
          </div>
        </Right>
      </Container>
    </Section>
  );
};

export default MessagePage;

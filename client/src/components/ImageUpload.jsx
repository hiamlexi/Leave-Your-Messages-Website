import React, { useRef, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://fonts.googleapis.com/css?family=Raleway');

  body {
    font-family: 'Raleway', sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #e0f0f0;
    margin: 0;
  }

  h1 {
    margin-bottom: 1em;
    color: #3c7373;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Box = styled.div`
  display: block;
  min-width: 300px;
  height: 300px;
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  overflow: hidden;
  position: relative;
`;

const ImagePreview = styled.div`
  height: 225px;
  width: 100%;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &::after {
    content: "photo_size_select_actual";
    font-family: 'Material Icons';
    font-size: 4.5em;
    color: rgba(230, 230, 230, 1);
    position: absolute;
    top: calc(50% - 3rem);
    left: calc(50% - 2.25rem);
    z-index: 0;
  }

  &.no-default::after {
    display: none;
  }
`;

const UploadOptions = styled.div`
  position: relative;
  height: 75px;
  background-color: cadetblue;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #6ebfbf;
  }

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;

    &::after {
      content: 'add';
      font-family: 'Material Icons';
      font-size: 2.5rem;
      color: rgba(230, 230, 230, 1);
      position: absolute;
      top: calc(50% - 2.5rem);
      left: calc(50% - 1.25rem);
    }
  }
`;

const Drop = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(95, 158, 160, 0.2);
  transform: scale(0);
  pointer-events: none;
`;

const ripple = keyframes`
  100% {
    opacity: 0;
    transform: scale(2.5);
  }
`;

const AnimateDrop = styled(Drop)`
  animation: ${ripple} 0.4s linear;
`;

const ImageUpload = () => {
  const boxesRef = useRef([]);

  useEffect(() => {
    boxesRef.current.forEach((box) => {
      const preview = box.querySelector(".js--image-preview");
      const input = box.querySelector(".image-upload");

      const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = () => {
          preview.style.backgroundImage = `url(${reader.result})`;
          preview.classList.add("no-default");
        };
        reader.readAsDataURL(file);
      };

      const handleRipple = (e) => {
        let drop = box.querySelector(".drop");
        if (!drop) {
          drop = document.createElement("span");
          drop.className = "drop";
          preview.appendChild(drop);
        }

        drop.className = "drop"; // reset animation

        const maxSize = Math.max(preview.clientWidth, preview.clientHeight);
        drop.style.width = `${maxSize}px`;
        drop.style.height = `${maxSize}px`;

        const rect = preview.getBoundingClientRect();
        const x = e.pageX - rect.left - maxSize / 2;
        const y = e.pageY - rect.top - maxSize / 2;

        drop.style.left = `${x}px`;
        drop.style.top = `${y}px`;
        drop.className += " animate";
      };

      preview.addEventListener("click", handleRipple);
      input.addEventListener("change", handleChange);

      return () => {
        preview.removeEventListener("click", handleRipple);
        input.removeEventListener("change", handleChange);
      };
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <h1>Image-upload with preview</h1>
      <Wrapper>
        {[0, 1, 2].map((_, i) => (
          <Box key={i} ref={(el) => (boxesRef.current[i] = el)}>
            <ImagePreview className="js--image-preview" />
            <UploadOptions>
              <label>
                <input className="image-upload" type="file" accept="image/*" />
              </label>
            </UploadOptions>
          </Box>
        ))}
      </Wrapper>
    </>
  );
};

export default ImageUpload;

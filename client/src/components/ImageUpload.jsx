// components/ImageUpload.jsx
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

const UploadBox = styled.div`
  width: 100%;
  background: #fff;
  border: 2px dashed #c2cdda;
  border-radius: 10px;
  max-height: 140px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 12px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  flex-shrink: 1;
`;

const ImagePreview = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 140px;
  display: ${(props) => (props.active ? "block" : "none")};
  background-image: ${(props) => `url(${props.image})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
`;

const CancelBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #9658fe;
  cursor: pointer;
  display: ${(props) => (props.active ? "block" : "none")};

  &:hover {
    color: #e74c3c;
  }
`;

const UploadIcon = styled(FaCloudUploadAlt)`
  font-size: 32px;
  color: #9658fe;
`;

const UploadText = styled.div`
  font-size: 12px;
  color: #5b5b7b;
  margin-top: 8px;
  text-align: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ChooseButton = styled.button`
  margin-top: 8px;
  width: 100%;
  height: 32px;
  border: none;
  outline: none;
  border-radius: 20px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(135deg, #3a8ffe 0%, #9658fe 100%);
`;

const ImageUpload = ({ onFileSelect }) => { 
  const inputRef = useRef();
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");

  const handleClick = () => inputRef.current.click();

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setFileName(file.name);
      onFileSelect?.(file); 
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setPreview("");
    setFileName("");
    inputRef.current.value = "";
    onFileSelect?.(null); 
  };
  return (
    <>
      <UploadBox>
        <ImagePreview active={!!preview} image={preview} />
        <CancelBtn active={!!preview} onClick={handleCancel}>
          <FaTimes />
        </CancelBtn>
        {!preview && (
          <>
            <UploadIcon />
            <UploadText>
              Upload a picture of us
              <br />
              (or anything you like)
            </UploadText>
          </>
        )}
      </UploadBox>
      <ChooseButton onClick={handleClick}>Choose a picture</ChooseButton>
      <HiddenInput
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleChange}
      />
    </>
  );
};

export default ImageUpload;

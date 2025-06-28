// components/ImageUpload.jsx
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

const UploadBox = styled.div`
  width: 100%;
  max-width: 100%;
  background: #fff;
  border: 2px dashed #c2cdda;
  border-radius: 10px;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  text-align: center;
`;

const ImagePreview = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.active ? "block" : "none")};
  background-size: cover;
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
  font-size: 50px;
  color: #9658fe;
`;

const UploadText = styled.div`
  font-size: 14px;
  color: #5B5B7B;
  margin-top: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ChooseButton = styled.button`
  margin-top: 16px;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 25px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(135deg, #3a8ffe 0%, #9658fe 100%);
`;

const ImageUpload = () => {
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
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setPreview("");
    setFileName("");
    inputRef.current.value = "";
  };

  return (
    <>
      <UploadBox>
        <ImagePreview active={!!preview} style={{ backgroundImage: `url(${preview})` }} />
        <CancelBtn active={!!preview} onClick={handleCancel}>
          <FaTimes />
        </CancelBtn>
        {!preview && (
          <>
            <UploadIcon />
            <UploadText>Upload a picture of us<br />(or anything you like)</UploadText>
          </>
        )}
      </UploadBox>
      <ChooseButton onClick={handleClick}>Choose a picture</ChooseButton>
      <HiddenInput type="file" ref={inputRef} accept="image/*" onChange={handleChange} />
    </>
  );
};

export default ImageUpload;

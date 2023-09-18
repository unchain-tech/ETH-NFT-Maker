import { Button } from "@mui/material";
import React from "react";
import ImageLogo from "./image.svg";
import "./NftUploader.css";

const NftUploader = () => {
  return (
    <div className="outerBox">
      <div className="title">
        <h2>NFT Uploader</h2>
        <p>image file (jpg or png)</p>
      </div>
      <div className="nftUplodeBox">
        <div className="imageLogoAndText">
          <img src={ImageLogo} alt="imagelogo" />
          <p>drag your image here</p>
        </div>
        <input
          className="nftUploadInput"
          multiple
          name="imageURL"
          type="file"
          accept=".jpg , .jpeg , .png"
        />
      </div>
      <p>or</p>
      <Button variant="contained">
        upload file
        <input
          className="nftUploadInput"
          type="file"
          accept=".jpg , .jpeg , .png"
        />
      </Button>
    </div>
  );
};

export default NftUploader;

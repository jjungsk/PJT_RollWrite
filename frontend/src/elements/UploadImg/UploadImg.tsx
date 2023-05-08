import React, { useState } from "react";
import { ReactComponent as AddBtn } from "../../assets/AddImgBtn.svg";
import { ReactComponent as Trash } from "../../assets/Trash-alt.svg";
import { UploadImgContainer } from "./style";

interface Props {
  setImgFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  img?: string;
  handelClickDeleteBtn?: () => void;
}
function UploadImg({ setImgFile, img, handelClickDeleteBtn }: Props) {
  const [tmpImg, setTmpImg] = useState<string>("");

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setTmpImg(e.target.result as string);
          setImgFile(files[0]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <label htmlFor="profile-img">
      <UploadImgContainer BgImg={tmpImg ? tmpImg : img ? img : ""}>
        <AddBtn />
        <input
          id="profile-img"
          type="file"
          accept="image/*"
          onChange={handleImg}
          style={{ display: "none" }}
        />
      </UploadImgContainer>
      {img && (
        <Trash
          style={{
            position: "absolute",
            top: "-12px",
            right: "-12px",
            backgroundColor: "var(--white-color)",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.25) 2px 2px 2px",
          }}
          onClick={handelClickDeleteBtn}
        />
      )}
    </label>
  );
}

export default UploadImg;

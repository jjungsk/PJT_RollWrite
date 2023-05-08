import React, { useState } from "react";
import UploadImg from "../../elements/UploadImg/UploadImg";
import TextArea from "../../elements/TextArea/TextArea";
import GhostBtn from "../../elements/Button/GhostBtn";

function InquiryPage() {
  const [ImgFile, setImgFile] = useState<File>();
  const [text, setText] = useState<string>("");

  const handleAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const formData = new FormData();
  const handleSaveBtn = () => {
    const jsonData = new Blob([text], { type: "application/json" });

    formData.append("addAnswerReqDto", jsonData);

    if (ImgFile) {
      formData.append("image", ImgFile);
    }
  };
  return (
    <div style={{ marginTop: "36px" }}>
      <UploadImg setImgFile={setImgFile} />
      <TextArea onChange={handleAnswer} value={text && text} />
      <GhostBtn label="저장하기" onClick={handleSaveBtn}></GhostBtn>
    </div>
  );
}

export default InquiryPage;

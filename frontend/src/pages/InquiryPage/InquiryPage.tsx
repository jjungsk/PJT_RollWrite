import React, { useState } from "react";
import UploadImg from "../../components/Molecules/UploadImg/UploadImg";
import TextArea from "../../components/Atom/TextArea/TextArea";
import { sendInquiry } from "../../apis/notification";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/Atom/Btn/Btn";

function InquiryPage() {
  const navigate = useNavigate();

  const [ImgFile, setImgFile] = useState<File>();
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const formData = new FormData();
  const handleSaveBtn = () => {
    if (text.length === 0) {
      toast.error("내용이 없습니다.");
      return;
    }

    const data = JSON.stringify({
      inquiry: text,
    });
    const jsonData = new Blob([data], { type: "application/json" });

    formData.append("addInquiryReqDto", jsonData);

    if (ImgFile) {
      formData.append("image", ImgFile);
    }

    if (!isLoading) {
      setIsLoading(true);
      toast
        .promise(sendInquiry(formData), {
          loading: "의견을 보내는 중입니다...",
          success: (
            <b>
              의견이 접수되었습니다.
              <br />
              소중한 피드백 감사합니다😘😘😘
            </b>
          ),
          error: <b>의견 전송에 실패했습니다.</b>,
        })
        .then(() => {
          setIsLoading(false);
          navigate("/setting");
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div style={{ marginTop: "36px" }}>
      <UploadImg setImgFile={setImgFile} />
      <TextArea onChange={handleAnswer} value={text && text} />
      {!isLoading && <Btn label="저장하기" onClick={handleSaveBtn}></Btn>}
    </div>
  );
}

export default InquiryPage;

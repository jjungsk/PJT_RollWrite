import React, { useState } from "react";
import UploadImg from "../../elements/UploadImg/UploadImg";

function InquiryPage() {
  const [ImgFile, setImgFile] = useState<File>();
  return (
    <div>
      <UploadImg setImgFile={setImgFile} />
    </div>
  );
}

export default InquiryPage;

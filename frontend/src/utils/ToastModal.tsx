import toast from "react-hot-toast";
import React from "react";

export const showToastModal = (
  clickEvent: () => void,
  question1: string,
  question2?: string
) => {
  toast.custom((t) => (
    <div className="toastModal">
      <p>{question1}</p>
      <p>{question2}</p>
      <div>
        <button
          className="yesBtn"
          onClick={() => {
            toast.dismiss(t.id);
            clickEvent();
          }}
        >
          네
        </button>
        <button className="noBtn" onClick={() => toast.dismiss(t.id)}>
          아니오
        </button>
      </div>
    </div>
  ));
};

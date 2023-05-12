import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "./firebase";
import { useAppDispatch, useAppSelector } from "../constants/types";
import { sendFirebaseToken } from "../apis/notification";
import { updateFirebaseToken } from "../store/authReducer";

const Notification = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const firebaseToken = useAppSelector((state) => state.auth.firebaseToken);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const notify = () => toast(<ToastDisplay />);

  function ToastDisplay() {
    return (
      <div style={{ zIndex: 999 }}>
        <p>
          <strong>{notification?.title}</strong>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  if (isLogin) {
    if (firebaseToken === "") {
      requestForToken().then((token) => {
        sendFirebaseToken(token);
        dispatch(updateFirebaseToken(token));
      });
    }

    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        });
      })
      .catch((err) => console.log("failed: ", err));
  }

  return <Toaster />;
};

export default Notification;

import { useEffect } from "react";

const useMobileDeviceDetection = () => {
  useEffect(() => {
    const isMobile = detectMobileDevice(window.navigator.userAgent);
    const isIphone = detectIphoneDevice(window.navigator.userAgent);
    const isInApp = detectInAppBrowser(window.navigator.userAgent);

    if (isMobile && isInApp && !isIphone) {
      window.close();
      window.location.href = `intent://${
        process.env.REACT_APP_SERVER_URL?.split("//")[1]
      }${
        window.location.pathname
      }#Intent;scheme=http;package=com.android.chrome;end`;
    }
  }, []);

  const detectMobileDevice = (agent: string) => {
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(agent);
  };

  const detectIphoneDevice = (agent: string) => {
    const iPhoneRegex = /(iPhone|iPod)/i;
    return iPhoneRegex.test(agent);
  };

  const detectInAppBrowser = (agent: string) => {
    const inAppRegex = [
      /KAKAOTALK/i,
      /Instagram/i,
      /NAVER/i,
      /zumapp/i,
      /whale/i,
      /FB/i,
      /Snapchat/i,
      /Line/i,
      /everytimeApp/i,
      /WhatsApp/i,
      /Electron/i,
      /wadiz/i,
      /AliApp/i,
      /FB_IAB/i,
      /FB4A/i,
      /FBAN/i,
      /FBIOS/i,
      /FBSS/i,
      /SamsungBrowser/i,
    ];
    return inAppRegex.some((mobile) => agent.match(mobile));
  };
};

export default useMobileDeviceDetection;

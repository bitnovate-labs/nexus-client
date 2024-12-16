import { useEffect, useRef } from "react";
import { Modal } from "antd";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../hooks/useAuth";
import { getTokenExpiryTime } from "../../utils/tokenUtils";
import { GET_TOKEN_INFO } from "../../graphql/queries/auth";

const SessionExpirationHandler = () => {
  const { extendSession, logout } = useAuth();
  const { data: tokenInfoData } = useQuery(GET_TOKEN_INFO);
  const warningDisplayed = useRef(false);
  const modalRef = useRef(null);
  const timersRef = useRef({ warning: null, expiration: null });

  const clearAll = () => {
    Object.values(timersRef.current).forEach((timer) => {
      if (timer) clearTimeout(timer);
    });
    timersRef.current = { warning: null, expiration: null };

    if (modalRef.current) {
      Modal.destroyAll();
      modalRef.current = null;
    }

    warningDisplayed.current = false;
  };

  const handleExpiration = () => {
    clearAll();
    logout("Your session has expired. Please log in again.");
  };

  const showWarningModal = (minutesLeft) => {
    if (warningDisplayed.current || modalRef.current) return;
    warningDisplayed.current = true;

    // Modal component
    modalRef.current = Modal.confirm({
      title: "Session Expiring Soon",
      content: `Your session will expire in ${minutesLeft} minutes. Would you like to stay logged in?`,
      okText: "Stay Logged In",
      cancelText: "Logout",
      maskClosable: false,
      keyboard: false,
      centered: true,
      onOk: async () => {
        try {
          const success = await extendSession();
          if (success) {
            clearAll();

            // Get new token expiry time and set up new timers
            const token = localStorage.getItem("token");
            if (token) {
              const newExpiryTime = getTokenExpiryTime(token);
              if (newExpiryTime) {
                setupTimers(newExpiryTime);
              }
            }
          } else {
            handleExpiration();
          }
        } catch (error) {
          handleExpiration();
          console.log(error);
        }
      },
      onCancel: () => {
        logout();
        clearAll();
      },
    });
  };

  const setupTimers = (expiryTime) => {
    if (!tokenInfoData?.tokenInfo) return;

    const { warningTime } = tokenInfoData.tokenInfo;
    const currentTime = Date.now();
    const warningTimeMs = warningTime * 1000;
    const warningThreshold = expiryTime - warningTimeMs;
    const timeUntilExpiry = expiryTime - currentTime;

    // Clear existing timers
    clearAll();

    // If already expired
    if (timeUntilExpiry <= 0) {
      handleExpiration();
      return;
    }

    // If before warning threshold, set up warning timer
    if (currentTime < warningThreshold) {
      timersRef.current.warning = setTimeout(() => {
        showWarningModal(Math.floor(warningTime / 60));
      }, warningThreshold - currentTime);
    }
    // If between warning threshold and expiry, show warning immediately
    else if (currentTime < expiryTime) {
      showWarningModal(Math.floor((expiryTime - currentTime) / 1000 / 60));
    }

    // Always set up expiration timer
    timersRef.current.expiration = setTimeout(
      handleExpiration,
      timeUntilExpiry
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !tokenInfoData?.tokenInfo) return;

    const expiryTime = getTokenExpiryTime(token);
    if (expiryTime) {
      setupTimers(expiryTime);
    }

    return clearAll;
  }, [tokenInfoData]);

  return null;
};

export default SessionExpirationHandler;

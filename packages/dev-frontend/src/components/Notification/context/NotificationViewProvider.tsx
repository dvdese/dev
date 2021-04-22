import React, { useState, useCallback, useEffect, useRef } from "react";
import { NotificationViewContext } from "./NotificationViewContext";
import type { NotificationView, NotificationEvent } from "./types";

type NotificationEventTransitions = Record<NotificationView, Partial<Record<NotificationEvent, NotificationView>>>;

const transitions: NotificationEventTransitions = {
  CLOSED: {
    EDIT_NOTIFICATION_PRESSED: "EDITED",
  },
  EDITED: {
    CANCEL_NOTIFICATION_PRESSED: "CLOSED",
    WAITING_NOTIFICATION_PRESSED: "WAITING",
  },
  WAITING: {
    CANCEL_NOTIFICATION_PRESSED: "CLOSED",
    EDIT_NOTIFICATION_PRESSED: "EDITED",
    SUBMITOK_NOTIFICATION_PRESSED: "SUBMITOK",
    SUBMITKO_NOTIFICATION_PRESSED: "SUBMITKO",
  },
  SUBMITOK: {
    CANCEL_NOTIFICATION_PRESSED: "CLOSED",
  },
  SUBMITKO: {
    CANCEL_NOTIFICATION_PRESSED: "CLOSED",
  }
};

export declare type UserNotificationStatus = "edit" | "waiting" | "closed" | "feedback";

type NotificationStateEvents = Partial<Record<UserNotificationStatus, NotificationEvent>>;

const notificationStatusEvents: NotificationStateEvents = {
  edit: "EDIT_NOTIFICATION_PRESSED",
};

const transition = (view: NotificationView, event: NotificationEvent): NotificationView => {
  const nextView = transitions[view][event] ?? view;
  return nextView;
};

const getInitialView = (notificationStatus: UserNotificationStatus): NotificationView => {
  if (notificationStatus === "edit") {
    return "EDITED";
  }
  return "CLOSED";
};

//const select = ({ notification: { status } }: LiquityStoreState) => status;

export const NotificationViewProvider: React.FC = props => {
  const { children } = props;
  //const notificationStatus = useLiquitySelector(select);
  const notificationStatus = "closed";

  const [view, setView] = useState<NotificationView>(getInitialView(notificationStatus));
  const viewRef = useRef<NotificationView>(view);

  const dispatchEvent = useCallback((event: NotificationEvent) => {
    const nextView = transition(viewRef.current, event);

    console.log(
      "dispatchEvent() [current-view, event, next-view]",
      viewRef.current,
      event,
      nextView
    );
    setView(nextView);
  }, []);

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  useEffect(() => {
    const event = notificationStatusEvents[notificationStatus] ?? null;
    if (event !== null) {
      dispatchEvent(event);
    }
  }, [notificationStatus, dispatchEvent]);

  const provider = {
    view,
    dispatchEvent
  };

  return <NotificationViewContext.Provider value={provider}>{children}</NotificationViewContext.Provider>;

};
















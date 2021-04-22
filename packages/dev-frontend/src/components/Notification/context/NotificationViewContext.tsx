import { createContext, useContext } from "react";
import type { NotificationView, NotificationEvent } from "./types";

type NotificationViewContextType = {
  view: NotificationView;
  dispatchEvent: (event: NotificationEvent) => void;
};

export const NotificationViewContext = createContext<NotificationViewContextType | null>(null);

export const useNotificationView = (): NotificationViewContextType => {
  const context: NotificationViewContextType | null = useContext(NotificationViewContext);

  if (context === null) {
    throw new Error("You must add a <NotificationViewProvider> into the React tree");
  }

  return context;
};

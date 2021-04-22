import { NotificationManager } from "./NotificationManager";
import { NoNotification } from "./NoNotification";
import { useNotificationView } from "./context/NotificationViewContext";
import { NotificationFeedback } from "./NotificationFeedback";


export const Notification: React.FC = () => {
  const { view } = useNotificationView();

  switch (view) {
    case "WAITING":
      return <NotificationManager isWaiting={true}> </NotificationManager>

    case "EDITED":
      return <NotificationManager isWaiting={false}> </NotificationManager>

    case "CLOSED":
      return <NoNotification />;

    case "SUBMITOK":
      return <NotificationFeedback isSubmit={true} />;

    case "SUBMITKO":
      return <NotificationFeedback isSubmit={false} />;
  }
};


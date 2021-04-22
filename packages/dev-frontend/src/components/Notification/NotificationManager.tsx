import { useNotificationView } from "./context/NotificationViewContext";

import { useLiquitySelector } from "@liquity/lib-react";
import { LiquityStoreState } from "@liquity/lib-base";

import { NotificationEditor } from "./NotificationEditor";

const select = ({ trove: { status } }: LiquityStoreState) => status;

type NotificationManagerProps = {
  isWaiting: boolean;
};

export const NotificationManager: React.FC<NotificationManagerProps> = ({
  children,
  isWaiting,
}) => {
  const troveStatus = useLiquitySelector(select);

  return (
    <NotificationEditor
        title={"Notifications"}
        troveStatus={troveStatus}
        isWaiting={isWaiting}>
    </NotificationEditor>
  );
};
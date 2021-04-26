import React, { useCallback } from "react";
import { Card, Heading, Box, Flex, Button } from "theme-ui";
import { InfoMessage } from "../InfoMessage";
import { useNotificationView } from "./context/NotificationViewContext";
import { InfoIcon } from "../InfoIcon";

export const NoNotification: React.FC = props => {

  const { dispatchEvent } = useNotificationView();

  const handleOpenNotification = useCallback(() => {
    dispatchEvent("EDIT_NOTIFICATION_PRESSED");
  }, [dispatchEvent]);

  return (
    <Card>
      <Heading>Notifications
      </Heading>
      <Box sx={{ p: [2, 3] }}>

        <InfoMessage title="Click to configure your notification alerts.">
            Keep having fun directly in your Inbox.
        </InfoMessage>

        <Flex variant="layout.actions">
            <Button onClick={handleOpenNotification}>Configure</Button>
        </Flex>
      </Box>
    </Card>
  );
};

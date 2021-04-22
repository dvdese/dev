import { Card, Heading, Box, Flex, Button, Text } from "theme-ui";
import { InfoMessage } from "../InfoMessage";
import { useNotificationView } from "./context/NotificationViewContext";
import { InfoIcon } from "../InfoIcon";
import React, { useCallback } from 'react';
import { NoNotification } from "./NoNotification";


type NotificationFeedbackProps = {
  isSubmit: boolean;
};

//TODO:
// Integrar NooNotification i Notification feedback i passar 2 booleans:
//   -isFeedbcak: per mostrar o no el Flex + fer el dispatchEvent del cancel
//   -isSubmit: per controlar missatge que es mostra
// Afegir alguna icona en els missatges (succes or fail)
export const NotificationFeedback: React.FC<NotificationFeedbackProps> = ({
  children,
  isSubmit,
}) => {

  const { dispatchEvent } = useNotificationView();

  const handleOpenNotification = useCallback(() => {
   dispatchEvent("EDIT_NOTIFICATION_PRESSED");
  }, [dispatchEvent]);

  setTimeout(() => {dispatchEvent("CANCEL_NOTIFICATION_PRESSED")}, 3000);

  return (
    <Card>
      <Heading>Notifications
      <InfoIcon
            tooltip={
              <Card variant="tooltip">
                Select which notification alerts doy you want to receive in your email
              </Card>
            }
          />
      </Heading>
      <Box sx={{ p: [2, 3] }}>

        <InfoMessage title="Click to configure your notification alerts.">
        </InfoMessage>

        <Flex variant="layout.actions">
            <Button onClick={handleOpenNotification}>Configure</Button>
        </Flex>
      </Box>

      <Flex
          sx={{
            alignItems: "center",
            bg: isSubmit ? "success": "danger",
            p: 3,
            pl: 4,
            overflow: "hidden",
          }}
            >
          <Text sx={{ fontSize: 3, color: "white" }}>
            { isSubmit ? "Alerts configuration succeed!" : "Alerts configuration failed!"}
          </Text>
      </Flex>
    </Card>
  );
};
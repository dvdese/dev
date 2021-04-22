type ClosedView = "CLOSED";
type EditedView = "EDITED";
type WaitingView = "WAITING";
type SubmitOkView = "SUBMITOK";
type SubmitKoView = "SUBMITKO";


export type NotificationView =
  | ClosedView
  | EditedView
  | WaitingView
  | SubmitOkView
  | SubmitKoView;

type OpenNotificationPressedEvent = "EDIT_NOTIFICATION_PRESSED";
type CancelNotificationPressed = "CANCEL_NOTIFICATION_PRESSED";
type WaitingNotificationPressed = "WAITING_NOTIFICATION_PRESSED";
type SubmitOkNotificationPressed = "SUBMITOK_NOTIFICATION_PRESSED";
type SubmitKoNotificationPressed = "SUBMITKO_NOTIFICATION_PRESSED";


export type NotificationEvent =
  | OpenNotificationPressedEvent
  | CancelNotificationPressed
  | WaitingNotificationPressed
  | SubmitOkNotificationPressed
  | SubmitKoNotificationPressed;
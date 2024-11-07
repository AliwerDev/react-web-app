interface MainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isProgressVisible: boolean;
  isActive: boolean;

  setText(text: string): MainButton;
  onClick(callback: () => void): MainButton;
  offClick(callback?: () => void): MainButton;
  show(): MainButton;
  hide(): MainButton;
  enable(): MainButton;
  disable(): MainButton;
  showProgress(leaveActive?: boolean): MainButton;
  hideProgress(): MainButton;
  setParams(params: { text?: string; color?: string; text_color?: string; is_active?: boolean; is_visible?: boolean }): MainButton;
}

interface BackButton {
  isVisible: boolean;

  show(): void;
  hide(): void;
  onClick(callback: () => void): void;
  offClick(callback?: () => void): void;
}

interface HapticFeedback {
  impactOccurred(style?: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
  notificationOccurred(type: "error" | "success" | "warning"): void;
  selectionChanged(): void;
}

interface PopupButton {
  id: string;
  type?: "default" | "ok" | "close" | "cancel" | "destructive";
  text: string;
}

type ShowPopup = (
  params: {
    title?: string;
    message: string;
    buttons: PopupButton[];
  },
  callback?: (buttonId: string) => void
) => void;

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    chat?: {
      id: number;
      type: string;
      title?: string;
      username?: string;
      first_name?: string;
      last_name?: string;
    };
    can_send_after?: number;
    auth_date: number;
    hash: string;
  };
  version: string;
  platform: string;
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  colorScheme: "light" | "dark";
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;

  // Main Button
  MainButton: MainButton;

  // Back Button
  BackButton: BackButton;

  // Haptic Feedback
  HapticFeedback: HapticFeedback;

  // Methods
  expand(): void;
  close(): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  disableVerticalSwipes(): void;
  enableVerticalSwipes(): void;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback: (confirmed: boolean) => void): void;
  sendData(data: string): void;
  showPopup: ShowPopup;
  onEvent(eventType: string, callback: (data?: any) => void): void;
  offEvent(eventType: string, callback?: (data?: any) => void): void;
}

const useWebApp = () => {
  const app: TelegramWebApp = window.Telegram.WebApp;
  return app;
};

export default useWebApp;

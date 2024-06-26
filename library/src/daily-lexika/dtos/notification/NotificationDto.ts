export interface NotificationDto {
  notificationId: number;
  toUserId: number;
  toUserEmail: string;
  sender: string;
  subject: string;
  message: string;
  sentAt: string;
  isRead: boolean;
}

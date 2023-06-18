package my.project.clients.notification;

public record NotificationRequest(

        Long toApplicationUserId,
        String toApplicationUserEmail,
        String message
) {
}

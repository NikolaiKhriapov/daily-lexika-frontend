package my.project.notification;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {

    @Id
    @SequenceGenerator(name = "notification_id_sequence", sequenceName = "notification_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_id_sequence")
    private Long toNotificationId;
    private Long toApplicationUserId;
    private String toApplicationUserEmail;
    private String sender;
    private String message;
    private LocalDateTime sentAt;

    public Notification(Long toApplicationUserId, String toApplicationUserEmail, String sender, String message, LocalDateTime sentAt) {
        this.toApplicationUserId = toApplicationUserId;
        this.toApplicationUserEmail = toApplicationUserEmail;
        this.sender = sender;
        this.message = message;
        this.sentAt = sentAt;
    }
}

package my.project.user.model.dto;

public record RegistrationRequest(
        String name,
        String email,
        String password
) {
}

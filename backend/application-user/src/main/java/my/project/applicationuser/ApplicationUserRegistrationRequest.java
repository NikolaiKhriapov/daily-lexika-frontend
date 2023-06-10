package my.project.applicationuser;

public record ApplicationUserRegistrationRequest(

        String name,
        String surname,
        String email
) {
}

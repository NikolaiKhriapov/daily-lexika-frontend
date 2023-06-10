package my.project.applicationuser;

import lombok.RequiredArgsConstructor;
import my.project.clients.fraudcheck.FraudCheckClient;
import my.project.clients.fraudcheck.FraudCheckResponse;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplicationUserService {

    private final ApplicationUserRepository applicationUserRepository;
    private final FraudCheckClient fraudCheckClient;

    public void registerUser(ApplicationUserRegistrationRequest applicationUserRegistrationRequest) {
        ApplicationUser applicationUser = new ApplicationUser(
                applicationUserRegistrationRequest.name(),
                applicationUserRegistrationRequest.surname(),
                applicationUserRegistrationRequest.email()
        );

        // TODO: check if email valid
        // TODO: check if email not taken

        applicationUserRepository.saveAndFlush(applicationUser);

        FraudCheckResponse fraudCheckResponse = fraudCheckClient.isFraudster(applicationUser.getId());

        if (fraudCheckResponse.isFraudster()) {
            throw new IllegalStateException("Fraudster");
        }
        // TODO: send notification
    }
}

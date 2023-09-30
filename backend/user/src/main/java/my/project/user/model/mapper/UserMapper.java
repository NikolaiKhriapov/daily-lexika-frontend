package my.project.user.model.mapper;

import lombok.RequiredArgsConstructor;
import my.project.user.model.entity.User;
import my.project.user.model.dto.UserDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserMapper implements Mapper<User, UserDTO> {

    @Override
    public UserDTO toDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                null,
                user.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()),
                user.getCurrentStreak(),
                user.getDateOfLastStreak(),
                user.getRecordStreak()
        );
    }

    public UserDTO toDTOStatistics(User user) {
        return new UserDTO(
                null,
                null,
                null,
                null,
                null,
                user.getCurrentStreak(),
                null,
                user.getRecordStreak()
        );
    }
}

package calendallica_server.goal;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import calendallica_server.goal.dto.GoalCreationDTO;
import calendallica_server.user.User;
import calendallica_server.user.UserRepository;

@Service
public class GoalService {
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalService(GoalRepository goalRepository, UserRepository userRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    public List<Goal> findAll(UUID userId) {
        return this.goalRepository.findByUserId(userId);
    }

    public Goal create(GoalCreationDTO data) {
        User user = this.userRepository.findById(data.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal newGoal = new Goal(data.title(), data.description(), data.userId());

        return this.goalRepository.save(newGoal);
    }
}

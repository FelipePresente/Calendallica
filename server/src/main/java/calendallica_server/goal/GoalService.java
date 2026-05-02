package calendallica_server.goal;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import calendallica_server.exception.ResourceNotFoundException;
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

    public List<Goal> findAllByUser(UUID userId) {
        return this.goalRepository.findByUserId(userId);
    }

    public Goal create(GoalCreationDTO data, UUID userId) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Goal newGoal = new Goal(data.title(), data.description(), user);

        return this.goalRepository.save(newGoal);
    }

    public void delete(UUID id, UUID userId) {
        Goal goal = this.goalRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));

        this.goalRepository.delete(goal);
    }
}

package calendallica_server.goal;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import calendallica_server.exception.ResourceNotFoundException;
import calendallica_server.goal.dto.GoalCreationDTO;
import calendallica_server.goal.dto.GoalResponseDTO;
import calendallica_server.goal.dto.GoalUpdateDTO;
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

    public List<GoalResponseDTO> findAllByUser(UUID userId) {
        List<Goal> goals = this.goalRepository.findByUserId(userId);

        return goals.stream()
                .map(GoalResponseDTO::fromEntity)
                .toList();
    }

    public GoalResponseDTO create(GoalCreationDTO data, UUID userId) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Goal newGoal = new Goal(data.title(), data.description(), user);

        this.goalRepository.save(newGoal);

        return GoalResponseDTO.fromEntity(newGoal);
    }

    public GoalResponseDTO update(GoalUpdateDTO data, UUID id, UUID userId) {
        Goal goal = this.goalRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));

        if (data.newTitle() != null && !data.newTitle().isBlank()) {
            goal.setTitle(data.newTitle());
        }

        if (data.newDescription() != null) {
            goal.setDescription(data.newDescription());
        }

        this.goalRepository.save(goal);

        return GoalResponseDTO.fromEntity(goal);
    }

    public void delete(UUID id, UUID userId) {
        Goal goal = this.goalRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));

        this.goalRepository.delete(goal);
    }
}

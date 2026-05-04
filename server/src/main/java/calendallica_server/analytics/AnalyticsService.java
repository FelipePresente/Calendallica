package calendallica_server.analytics;

import org.springframework.stereotype.Service;

import calendallica_server.analytics.dto.AnalyticsResponseDTO;
import calendallica_server.goal.GoalRepository;
import calendallica_server.task.TaskRepository;
import calendallica_server.user.UserRepository;

@Service
public class AnalyticsService {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final GoalRepository goalRepository;

    public AnalyticsService(UserRepository userRepository, TaskRepository taskRepository, GoalRepository goalRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.goalRepository = goalRepository;
    }

    public AnalyticsResponseDTO getAnalytics() {
        Analytics analytics = new Analytics();

        analytics.setUserCount(this.userRepository.count());
        analytics.setTaskCount(this.taskRepository.count());
        analytics.setGoalCount(this.goalRepository.count());

        return AnalyticsResponseDTO.fromEntity(analytics);
    }
}

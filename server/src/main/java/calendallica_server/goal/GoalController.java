package calendallica_server.goal;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import calendallica_server.goal.dto.GoalCreationDTO;
import calendallica_server.goal.dto.GoalResponseDTO;
import calendallica_server.user.User;
import jakarta.validation.Valid;

@RestController
@RequestMapping("goals")
public class GoalController {
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public List<GoalResponseDTO> findAllByUser(@AuthenticationPrincipal User user) {
        List<Goal> goals = this.goalService.findAllByUser(user.getId());

        return goals.stream()
                .map(GoalResponseDTO::fromEntity)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GoalResponseDTO create(@Valid @RequestBody GoalCreationDTO data, @AuthenticationPrincipal User user) {
        Goal newGoal = this.goalService.create(data, user.getId());
        return GoalResponseDTO.fromEntity(newGoal);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        this.goalService.delete(id, user.getId());
    }
}
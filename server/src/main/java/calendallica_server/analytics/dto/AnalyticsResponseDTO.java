package calendallica_server.analytics.dto;

import calendallica_server.analytics.Analytics;

public record AnalyticsResponseDTO(
    Long user_count,
    Long task_count,
    Long goal_count
) {
    public static AnalyticsResponseDTO fromEntity(Analytics analytics) {
        return new AnalyticsResponseDTO(
            analytics.getUserCount(),
            analytics.getTaskCount(),
            analytics.getGoalCount()
        );
    }
}

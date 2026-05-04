package calendallica_server.analytics.dto;

import calendallica_server.analytics.Analytics;

public record AnalyticsResponseDTO(
    int user_count,
    int task_count,
    int goal_count
) {
    public static AnalyticsResponseDTO fromEntity(Analytics analytics) {
        return new AnalyticsResponseDTO(
            analytics.getUser_count(),
            analytics.getTask_count(),
            analytics.getTask_count()
        );
    }
}

namespace Vitae.Api.Contracts;

public sealed record ResumeDraftResponse(
    int Id,
    string Title,
    string? TargetRole,
    string Template,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
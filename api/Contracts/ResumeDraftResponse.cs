namespace Vitae.Api.Contracts;

public sealed record ResumeDraftResponse(
    int Id,
    string Title,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
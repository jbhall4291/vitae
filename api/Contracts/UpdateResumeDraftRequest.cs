namespace Vitae.Api.Contracts;

public sealed record UpdateResumeDraftRequest(
    string Title,
    string? TargetRole,
    string? Template
);
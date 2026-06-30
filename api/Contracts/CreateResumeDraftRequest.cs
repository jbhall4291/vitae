namespace Vitae.Api.Contracts;

public sealed record CreateResumeDraftRequest(
    string Title,
    string? TargetRole,
    string? Template
    );
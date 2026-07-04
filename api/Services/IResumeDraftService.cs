using Vitae.Api.Contracts;

namespace Vitae.Api.Services;

public interface IResumeDraftService
{
    Task<IReadOnlyList<ResumeDraftResponse>> GetResumeDraftsAsync();
    Task<ResumeDraftResponse?> GetResumeDraftByIdAsync(int id);
    Task<ResumeDraftResponse> CreateResumeDraftAsync(CreateResumeDraftRequest request);
    Task<ResumeDraftResponse?> UpdateResumeDraftAsync(int id, UpdateResumeDraftRequest request);
    Task<bool> DeleteResumeDraftAsync(int id);
}
using Vitae.Api.Contracts;

namespace Vitae.Api.Services;

public interface IResumeDraftService
{
    Task<IReadOnlyList<ResumeDraftResponse>> GetResumeDraftsAsync();
    Task<ResumeDraftResponse> CreateResumeDraftAsync(CreateResumeDraftRequest request);

}
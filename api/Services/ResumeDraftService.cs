using Microsoft.EntityFrameworkCore;
using Vitae.Api.Contracts;
using Vitae.Api.Data;
using Vitae.Api.Models;

namespace Vitae.Api.Services;

public class ResumeDraftService : IResumeDraftService
{
    private readonly VitaeDbContext _db;

    public ResumeDraftService(VitaeDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<ResumeDraftResponse>> GetResumeDraftsAsync()
    {
        return await _db.ResumeDrafts
            .OrderByDescending(draft => draft.CreatedAt)
            .Select(draft => new ResumeDraftResponse(
                draft.Id,
                draft.Title,
                draft.CreatedAt,
                draft.UpdatedAt
            ))
            .ToListAsync();
    }

    public async Task<ResumeDraftResponse> CreateResumeDraftAsync(CreateResumeDraftRequest request)
    {
        var now = DateTime.UtcNow;

        var draft = new ResumeDraft
        {
            Title = request.Title.Trim(),
            CreatedAt = now,
            UpdatedAt = now
        };

        _db.ResumeDrafts.Add(draft);

        await _db.SaveChangesAsync();

        return new ResumeDraftResponse(
            draft.Id,
            draft.Title,
            draft.CreatedAt,
            draft.UpdatedAt
        );
    }
}
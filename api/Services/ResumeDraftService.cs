using Microsoft.EntityFrameworkCore;
using Vitae.Api.Contracts;
using Vitae.Api.Data;
using Vitae.Api.Models;
using Vitae.Api.Domain;

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
                draft.TargetRole,
                draft.Template,
                draft.CreatedAt,
                draft.UpdatedAt
            ))
            .ToListAsync();
    }

    public async Task<ResumeDraftResponse?> GetResumeDraftByIdAsync(int id)
    {
        return await _db.ResumeDrafts
            .AsNoTracking()
            .Where(draft => draft.Id == id)
            .Select(draft => new ResumeDraftResponse(
                draft.Id,
                draft.Title,
                draft.TargetRole,
                draft.Template,
                draft.CreatedAt,
                draft.UpdatedAt
            ))
            .FirstOrDefaultAsync();
    }

    public async Task<ResumeDraftResponse> CreateResumeDraftAsync(CreateResumeDraftRequest request)
    {
        var now = DateTime.UtcNow;

        var draft = new ResumeDraft
        {
            Title = request.Title.Trim(),
            TargetRole = string.IsNullOrWhiteSpace(request.TargetRole) ? null : request.TargetRole.Trim(),
            Template = ResumeTemplates.NormalizeOrDefault(request.Template),
            CreatedAt = now,
            UpdatedAt = now
        };

        _db.ResumeDrafts.Add(draft);

        await _db.SaveChangesAsync();

        return new ResumeDraftResponse(
            draft.Id,
            draft.Title,
            draft.TargetRole,
            draft.Template,
            draft.CreatedAt,
            draft.UpdatedAt
        );
    }

    public async Task<ResumeDraftResponse?> UpdateResumeDraftAsync(int id, UpdateResumeDraftRequest request)
    {
        var draft = await _db.ResumeDrafts
            .FirstOrDefaultAsync(draft => draft.Id == id);

        if (draft is null)
        {
            return null;
        }

        draft.Title = request.Title.Trim();

        draft.TargetRole = string.IsNullOrWhiteSpace(request.TargetRole)
            ? null
            : request.TargetRole.Trim();

        draft.Template = ResumeTemplates.NormalizeOrDefault(request.Template);

        draft.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return new ResumeDraftResponse(
            draft.Id,
            draft.Title,
            draft.TargetRole,
            draft.Template,
            draft.CreatedAt,
            draft.UpdatedAt
        );
    }

    public async Task<bool> DeleteResumeDraftAsync(int id)
    {
        var draft = await _db.ResumeDrafts
            .FirstOrDefaultAsync(draft => draft.Id == id);

        if (draft is null)
        {
            return false;
        }

        _db.ResumeDrafts.Remove(draft);

        await _db.SaveChangesAsync();

        return true;
    }

}
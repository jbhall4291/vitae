using Vitae.Api.Services;
using Vitae.Api.Contracts;
using Vitae.Api.Domain;

namespace Vitae.Api.Endpoints;

public static class ResumeDraftEndpoints
{
    public static RouteGroupBuilder MapResumeDraftEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/resume-drafts");

        group.MapGet("/", async (IResumeDraftService resumeDraftService) =>
        {
            var drafts = await resumeDraftService.GetResumeDraftsAsync();

            return Results.Ok(drafts);
        });

        group.MapGet("/{id:int}", async (
            int id,
            IResumeDraftService resumeDraftService) =>
        {
            var draft = await resumeDraftService.GetResumeDraftByIdAsync(id);

            return draft is null ? Results.NotFound() : Results.Ok(draft);
        });

        group.MapPost("/", async (
            CreateResumeDraftRequest request,
            IResumeDraftService resumeDraftService) =>
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                return Results.BadRequest("Title is required.");
            }

            if (!ResumeTemplates.IsAllowed(request.Template))
            {
                return Results.BadRequest("Template is invalid.");
            }

            var draft = await resumeDraftService.CreateResumeDraftAsync(request);

            return Results.Created($"/api/resume-drafts/{draft.Id}", draft);
        });

        group.MapPut("/{id:int}", async (
           int id,
           UpdateResumeDraftRequest request,
           IResumeDraftService resumeDraftService) =>
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                return Results.BadRequest("Title is required.");
            }

            if (!ResumeTemplates.IsAllowed(request.Template))
            {
                return Results.BadRequest("Template is invalid.");
            }

            var draft = await resumeDraftService.UpdateResumeDraftAsync(id, request);

            return draft is null ? Results.NotFound() : Results.Ok(draft);
        });

        group.MapDelete("/{id:int}", async (int id, IResumeDraftService resumeDraftService) =>
        {
            var deleted = await resumeDraftService.DeleteResumeDraftAsync(id);

            return deleted ? Results.NoContent() : Results.NotFound();
        });

        return group;
    }
}
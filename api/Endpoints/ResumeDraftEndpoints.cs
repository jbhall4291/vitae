using Vitae.Api.Services;
using Vitae.Api.Contracts;

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

        group.MapPost("/", async (
            CreateResumeDraftRequest request,
            IResumeDraftService resumeDraftService) =>
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                return Results.BadRequest("Title is required.");
            }

            var allowedTemplates = new[] { "modern", "classic", "compact" };

            if (!string.IsNullOrWhiteSpace(request.Template) &&
                !allowedTemplates.Contains(request.Template))
            {
                return Results.BadRequest("Template is invalid.");
            }

            var draft = await resumeDraftService.CreateResumeDraftAsync(request);

            return Results.Created($"/api/resume-drafts/{draft.Id}", draft);
        });

        return group;
    }
}
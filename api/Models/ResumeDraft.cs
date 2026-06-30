namespace Vitae.Api.Models;

public class ResumeDraft
{
    public int Id { get; set; }

    public required string Title { get; set; }
    
    public string? TargetRole { get; set; }

    public string Template { get; set; } = "modern";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
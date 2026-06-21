namespace Vitae.Api.Models;

public class ResumeDraft
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
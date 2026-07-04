namespace Vitae.Api.Domain;

public static class ResumeTemplates
{
    public const string Default = "modern";

    public static readonly string[] Allowed =
    [
        "modern",
        "classic",
        "compact"
    ];

    public static bool IsAllowed(string? template)
    {
        return string.IsNullOrWhiteSpace(template) ||
               Allowed.Contains(template.Trim());
    }

    public static string NormalizeOrDefault(string? template)
    {
        return string.IsNullOrWhiteSpace(template)
            ? Default
            : template.Trim();
    }
}
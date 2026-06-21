using Microsoft.EntityFrameworkCore;
using Vitae.Api.Models;

namespace Vitae.Api.Data;

public class VitaeDbContext : DbContext
{
    public VitaeDbContext(DbContextOptions<VitaeDbContext> options)
        : base(options)
    {
    }

    public DbSet<ResumeDraft> ResumeDrafts => Set<ResumeDraft>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ResumeDraft>(entity =>
        {
            entity.Property(draft => draft.Title)
                .HasMaxLength(200)
                .IsRequired();
        });
    }
}
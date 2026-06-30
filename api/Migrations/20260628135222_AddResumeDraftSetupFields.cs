using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vitae.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddResumeDraftSetupFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TargetRole",
                table: "ResumeDrafts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Template",
                table: "ResumeDrafts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TargetRole",
                table: "ResumeDrafts");

            migrationBuilder.DropColumn(
                name: "Template",
                table: "ResumeDrafts");
        }
    }
}

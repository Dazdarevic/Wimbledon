using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LoginAndRegister.Migrations
{
    /// <inheritdoc />
    public partial class playerImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Player",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Player",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Player",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Player");
        }
    }
}

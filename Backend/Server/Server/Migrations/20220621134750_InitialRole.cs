using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class InitialRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f8c3e27d-e40a-4d84-9655-5521ab252b5e", "e3b6e3b8-45dc-41d4-bba0-e535e6f8e5a1", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "aa7ba01e-f2dc-4b49-8e0b-a314fde67759", "ed2d4f7f-7c25-4668-89fd-31ea00e09810", "Dostavljac", "DOSTAVLJAC" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5d6814e6-3ddb-48eb-ba1c-a3af484be472", "736f7f07-5b81-4126-b220-c363ea96c2bc", "Potrosac", "POTROSAC" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5d6814e6-3ddb-48eb-ba1c-a3af484be472");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aa7ba01e-f2dc-4b49-8e0b-a314fde67759");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8c3e27d-e40a-4d84-9655-5521ab252b5e");
        }
    }
}

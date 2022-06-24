using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations.CRUD_OtherResources
{
    public partial class AddDeliveryTimeToOrdersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeliveryTime",
                table: "Orders",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryTime",
                table: "Orders");
        }
    }
}

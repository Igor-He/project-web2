using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(new IdentityRole { Name="Administrator", NormalizedName="ADMINISTRATOR"}, 
                            new IdentityRole { Name="Dostavljac", NormalizedName="DOSTAVLJAC"},
                            new IdentityRole { Name="Potrosac", NormalizedName="POTROSAC"});
        }
    }
}

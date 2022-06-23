using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Data
{
    public class CRUD_OtherResourcesContext : DbContext
    {
        public CRUD_OtherResourcesContext(DbContextOptions<CRUD_OtherResourcesContext> options) : base(options)
        {
        }
        public DbSet<Server.Models.Product> Product { get; set; }
    }
}

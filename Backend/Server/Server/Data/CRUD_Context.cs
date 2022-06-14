using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Data
{
    public class CRUD_Context:DbContext
    {
        public CRUD_Context(DbContextOptions<CRUD_Context> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}

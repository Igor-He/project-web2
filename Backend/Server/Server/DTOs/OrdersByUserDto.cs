using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class OrdersByUserDto
    {
        public string UserId { get; set; }
        public string UserType { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class PickUpOrderDto
    {
        public int OrderId { get; set; }
        public string DelivererId { get; set; }
    }
}

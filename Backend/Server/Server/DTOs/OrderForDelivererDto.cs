using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class OrderForDelivererDto
    {
        public int? Id { get; set; }
        public IEnumerable<ProductOrderDto> Products { get; set; }
        public string Address { get; set; }
        public string? Comment { get; set; }
        public int Price { get; set; }
        public string CustomerId { get; set; }
    }
}

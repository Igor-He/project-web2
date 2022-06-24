using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class ProductOrderDto
    {
        public ProductsDto Product { get; set; }
        public int Quantity { get; set; }
    }
}

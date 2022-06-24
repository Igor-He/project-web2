using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    [Table("Orders")]
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public IEnumerable<ProductOrder> Products { get; set; }
        public string Address { get; set; }
        public string? Comment { get; set; }
        public int Price { get; set; }
        public User? Deliverer { get; set; }
        public User Customer { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public DateTime? DeliveryTime { get; set; }
        public string? Secret { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly CRUD_OtherResourcesContext _context;
        private readonly UserManager<User> _userManager;

        public OrdersController(CRUD_OtherResourcesContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/current
        [HttpPost("current")]
        public async Task<ActionResult> GetOrder(string userId)
        {
            var order = await _context.Orders.Include(x => x.Products).ThenInclude(x => x.Product).FirstAsync(x=>(x.CustomerId==userId || x.DelivererId==userId) && x.OrderStatus!=OrderStatus.Delivered);

            if (order == null)
            {
                return BadRequest();
            }
            OrderDto orderDto = new OrderDto();
            orderDto.Address = order.Address;
            orderDto.Comment = order.Comment;
            orderDto.CustomerId = order.CustomerId;
            orderDto.OrderStatus = order.OrderStatus;
            orderDto.DelivererId = order.DelivererId;
            //orderDto.DeliveryTime = order.DeliveryTime; int year, int month, int day, int hour, int minute, int second)
            orderDto.DeliveryTime = new DateTime(2022, 6, 25, 00, 8, 00);
            orderDto.Id = order.Id;
            orderDto.Price = order.Price;
            List<ProductOrderDto> prOrd = new List<ProductOrderDto>();
            foreach (ProductOrder prod in order.Products)
            {
                ProductsDto pDto = new ProductsDto();
                pDto.Id = prod.Product.Id;
                pDto.Ingredient = prod.Product.Ingredient;
                pDto.Name = prod.Product.Name;
                pDto.Price = prod.Product.Price;

                ProductOrderDto dto = new ProductOrderDto();
                dto.Product = pDto;
                dto.Quantity = prod.Quantity;
                prOrd.Add(dto);

            }
            orderDto.Products = prOrd;
            return Ok(orderDto);
        }


        [HttpGet("available")]
        public async Task<ActionResult> GetAvailableOrders()
        {
            var orders = await _context.Orders.Where(x=> x.DelivererId==null).Include(x=> x.Products).ThenInclude(x=>x.Product).ToListAsync();
            List<OrderForDelivererDto> retList = new List<OrderForDelivererDto>();
            foreach (Order order in orders)
            {
                OrderForDelivererDto ord = new OrderForDelivererDto();
                ord.Address = order.Address;
                ord.Comment= order.Comment;
                ord.CustomerId= order.CustomerId;
                ord.Id= order.Id;
                ord.Price= order.Price;
                List<ProductOrderDto> prOrd = new List<ProductOrderDto>();
                foreach(ProductOrder prod in order.Products)
                {
                    ProductsDto pDto = new ProductsDto();
                    pDto.Id = prod.Product.Id;
                    pDto.Ingredient = prod.Product.Ingredient;
                    pDto.Name = prod.Product.Name;
                    pDto.Price = prod.Product.Price;

                    ProductOrderDto dto = new ProductOrderDto();
                    dto.Product = pDto;
                    dto.Quantity = prod.Quantity;
                    prOrd.Add(dto);
                    
                }
                ord.Products = prOrd;
                retList.Add(ord);

            }

            return Ok(retList);
        }
        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult> PostOrder(OrderDto orderDto)
        {
            List<ProductOrder> products = new List<ProductOrder>();
            
            foreach (ProductOrderDto prod in orderDto.Products) 
            {
                ProductOrder prodOrder = new ProductOrder();
                var p = await _context.Product.FindAsync(prod.Product.Id);
                prodOrder.Product = p;
                prodOrder.Quantity = prod.Quantity;
                
                products.Add(prodOrder);
                _context.ProductOrders.Add(prodOrder);
            }
            
            Order order = new Order();
            order.Address = orderDto.Address;
            order.Comment = orderDto.Comment;
            order.Price = orderDto.Price;
            order.CustomerId = orderDto.CustomerId;
            order.OrderStatus = orderDto.OrderStatus;
            order.Products = products;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}

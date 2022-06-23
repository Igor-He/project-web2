using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly CRUD_OtherResourcesContext _context;

        public ProductsController(CRUD_OtherResourcesContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult> GetProduct()
        {
            var allProducts= await _context.Product.ToListAsync();
            List<ProductsDto> products = new List<ProductsDto>();
            foreach(Product prod in allProducts)
            {
                ProductsDto productsDto = new ProductsDto();
                productsDto.Id = prod.Id;
                productsDto.Name = prod.Name;
                productsDto.Price = prod.Price;
                productsDto.Ingredient = prod.Ingredient;
                products.Add(productsDto);
            }
            return Ok(products);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductDto productsDto)
        {
            var product = new Product();
            product.Name = productsDto.Name;
            product.Price = productsDto.Price;
            product.Ingredient = productsDto.Ingredient;
            _context.Product.Add(product);
            var result=await _context.SaveChangesAsync();
            if (result > 0)
                return Ok();
            else
                return BadRequest();
            
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
}

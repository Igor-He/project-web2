using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
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
    }
}

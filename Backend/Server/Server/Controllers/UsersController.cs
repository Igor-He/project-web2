using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CRUD_Context _context;
        private readonly IConfigurationSection _secretKey;

        public UsersController(CRUD_Context context, IConfiguration configuration)
        {
            _context = context;
            _secretKey = configuration.GetSection("SecretKey");
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        [HttpPost]
        [Route("Login")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            try
            {
                User user = await _context.Users.FirstAsync(x => x.Email == (userLoginDto.Email));
                if (user.Password == userLoginDto.Password)
                {
                    List<Claim> claims = new List<Claim>();

                    if (user.Type == UserType.Administrator)
                        claims.Add(new Claim(ClaimTypes.Role, "Administrator"));
                    if (user.Type == UserType.Dostavljac)
                        claims.Add(new Claim(ClaimTypes.Role, "Dostavljac"));
                    if (user.Type == UserType.Potrosac)
                        claims.Add(new Claim(ClaimTypes.Role, "Potrosac"));

                    claims.Add(new Claim("UserID", user.Id.ToString()));
                    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "https://localhost:44347",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: signinCredentials
                    );
                    string token = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return Ok(new { token });
                }
                else
                {
                    return BadRequest(new { message = "Password is incorrect." });
                }
            }
            catch
            {
                return BadRequest(new { message = "Email is incorrect!" });
            }
        }
    }
}

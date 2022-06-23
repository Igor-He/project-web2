using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Jwt;
using Server.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtHandler _jwtHandler;

        public UsersController(UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler)
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
        }
        [HttpPost("registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();
            string nickname = userForRegistration.Username;
            var user = _mapper.Map<User>(userForRegistration);
            user.Nickname = nickname;
            var result = await _userManager.CreateAsync(user, userForRegistration.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegistrationResponseDto { Errors = errors });
            }
            if (userForRegistration.Type == UserType.Administrator)
            {
                user.Status = UserStatus.Approved;
                await _userManager.AddToRoleAsync(user, "Administrator");
            }
            else if (userForRegistration.Type == UserType.Potrosac)
            {
                user.Status = UserStatus.Approved;
                await _userManager.AddToRoleAsync(user, "Potrosac");
            }
            else if (userForRegistration.Type == UserType.Dostavljac)
            {
                user.Status = UserStatus.Processing;
                await _userManager.AddToRoleAsync(user, "Dostavljac");
            }
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userForLoginDto.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, userForLoginDto.Password))
                return Unauthorized(new LoginResponseDto { ErrorMessage = "Invalid Authentication" });

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims =await _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new LoginResponseDto { IsAuthSuccessful = true, Token = token });
        }

        [HttpGet("{userEmail}")]
        [Authorize]
        public async Task<IActionResult> GetUserProfile(string userEmail)
        {
            var user = await _userManager.FindByNameAsync(userEmail);
            if(user != null)
            {
                var roles = await _userManager.GetRolesAsync(user);
                UserProfileDto userProfileDto = new UserProfileDto();
                userProfileDto.Name = user.Name;
                userProfileDto.Surname = user.Surname;
                if (user.Status == UserStatus.Approved)
                    userProfileDto.Status = "Approved";
                else if (user.Status == UserStatus.Reject)
                    userProfileDto.Status = "Reject";
                else
                    userProfileDto.Status = "Processing";
                userProfileDto.DateOfBirth = user.DateOfBirth;
                userProfileDto.Type = roles[0];
                userProfileDto.Username = user.Nickname;
                userProfileDto.Email = user.Email;
                userProfileDto.Address = user.Address;

                return Ok(userProfileDto);
            }
            return BadRequest();

        }

        [HttpPut("{userEmail}")]
        [Authorize]
        public async Task<IActionResult> EditProfile(string userEmail, UserProfileDto userProfileDto)
        {
            if (userEmail != userProfileDto.Email)
            {
                return BadRequest();
            }
            var user = await _userManager.FindByNameAsync(userEmail);
            if (user == null)
            {
                return BadRequest();
            }
            user.Address = userProfileDto.Address;
            user.DateOfBirth = userProfileDto.DateOfBirth;
            user.Nickname = userProfileDto.Username;
            user.Name = userProfileDto.Name;
            user.Surname = userProfileDto.Surname;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return Ok();
            else
                return BadRequest();
        }

        [HttpGet("all-deliverers")]
        //Authorize(Roles ="Administrator")]
        public async Task<IActionResult> GetAllDeliverers()
        {
            var deliverers = await _userManager.GetUsersInRoleAsync("Dostavljac");
            List<UserProfileDto> allDeliverersDto = new List<UserProfileDto>();
            foreach(User user in deliverers)
            {
                UserProfileDto userProfileDto = new UserProfileDto();
                userProfileDto.Name = user.Name;
                userProfileDto.Surname = user.Surname;
                if (user.Status == UserStatus.Approved)
                    userProfileDto.Status = "Approved";
                else if (user.Status == UserStatus.Reject)
                    userProfileDto.Status = "Reject";
                else
                    userProfileDto.Status = "Processing";
                userProfileDto.DateOfBirth = user.DateOfBirth;
                userProfileDto.Type = "Dostavljac";
                userProfileDto.Username = user.Nickname;
                userProfileDto.Email = user.Email;
                userProfileDto.Address = user.Address;
                allDeliverersDto.Add(userProfileDto);
            }
           
            return Ok(allDeliverersDto);
        }
    }
}

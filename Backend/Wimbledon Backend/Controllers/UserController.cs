using LoginAndRegister.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LoginAndRegister.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContext _userContext;
        private readonly IConfiguration _configuration;

        public UserController(UserContext userContext, IConfiguration configuration)
        {
            _userContext = userContext;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetUsers(string? role)
        {
            IQueryable<User> users = _userContext.Users;

            if (!string.IsNullOrEmpty(role))
            {
                users = users.Where(u => u.UserRole == role);
            }

            var userList = users.ToList();

            return Ok(userList);
        }

        [HttpPost("CheckEmailExists")]
        public async Task<ActionResult<bool>> CheckEmailExists(UserEmailModel userEmailModel)
        {
            var exists = await _userContext.Users.AnyAsync(u => u.UserEmail == userEmailModel.UserEmail);
            return Ok(new { exists });
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_userContext.Users == null)
            {
                return NotFound();
            }
            var user = await _userContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _userContext.Users.Add(user);
            await _userContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.ID }, user);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> PutUser(int id, User user)
        {
            if (id != user.ID)
            {
                return BadRequest();
            }
            _userContext.Entry(user).State = EntityState.Modified;
            try
            {
                await _userContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _userContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _userContext.Users.Remove(user);
            await _userContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("changepassword")]
        public async Task<ActionResult> ChangePasswordByEmail(string userEmail, ChangePasswordModel changePasswordModel)
        {
            var user = await _userContext.Users.FirstOrDefaultAsync(u => u.UserEmail == userEmail);
            if (user == null)
            {
                return NotFound();
            }

            if (changePasswordModel.OldPassword != user.UserPassword)
            {
                return BadRequest("Stara lozinka nije ispravna.");
            }

            // Ažuriraj lozinku
            user.UserPassword = changePasswordModel.NewPassword;
            await _userContext.SaveChangesAsync();

            // Generiraj novi accessToken
#pragma warning disable CS8604 // Possible null reference argument.
            var accessToken = GenerateAccessToken(user.UserEmail, user.UserRole, user.UserName, changePasswordModel.NewPassword, user.ID);
#pragma warning restore CS8604 // Possible null reference argument.

            return Ok(new { AccessToken = accessToken });
        }

        private string GenerateAccessToken(string userEmail, string userRole, string userName, string userPassword, int id)
        {
#pragma warning disable CS8604 // Possible null reference argument.
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("UserEmail", userEmail),
                new Claim("UserRole", userRole),
                new Claim("UserName", userName),
                new Claim("UserPassword", userPassword),
                new Claim("UserId", id.ToString())
            };
#pragma warning restore CS8604 // Possible null reference argument.

#pragma warning disable CS8604 // Possible null reference argument.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
#pragma warning restore CS8604 // Possible null reference argument.
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    
    }
}

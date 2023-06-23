using LoginAndRegister.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;

namespace LoginAndRegister.Controllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserContext _userContext;
        private readonly IConfiguration _configuration;

        public LoginController(UserContext userContext, IConfiguration configuration)
        {
            _userContext = userContext;
            _configuration = configuration;
        }


        [HttpPost]
        [Route("PostLoginDetails")]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IActionResult> PostLoginDetails(User _userData)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            if (_userData != null)
            {

                var resultLoginCheck = _userContext.Users
                    .Where(e => e.UserEmail == _userData.UserEmail && e.UserPassword == _userData.UserPassword)
                    .FirstOrDefault();
                if (resultLoginCheck == null)
                {
                    return BadRequest("Invalid Credentials");
                }
                else
                {
                    var refreshToken = GenerateRefreshToken();
                    resultLoginCheck.RefreshToken = refreshToken;
                    await _userContext.SaveChangesAsync();
                    //_userData.UserMessage = "Login Success";

#pragma warning disable CS8604 // Possible null reference argument.
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserEmail", _userData.UserEmail),
                        new Claim("UserRole", resultLoginCheck.UserRole),
                        new Claim("UserName", resultLoginCheck.UserName),
                        new Claim("UserPassword", _userData.UserPassword),
                        new Claim("UserId", resultLoginCheck.ID.ToString())
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


                    _userData.AccessToken = new JwtSecurityTokenHandler().WriteToken(token);

                    var response = new
                    {
                        AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                        RefreshToken = refreshToken,
                        resultLoginCheck.UserName,
                        resultLoginCheck.UserRole,
                        resultLoginCheck.ID  
                    };

                    return Ok(response);
                }
            }
            else
            {
                return BadRequest("No Data Posted");
            }
        }


        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}

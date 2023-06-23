using LoginAndRegister.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace LoginAndRegister.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetUserLogin : ControllerBase
    {
        private readonly UserContext _userContext;
        public GetUserLogin(UserContext userContext)
        {
            _userContext = userContext;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetUserLogIn(string? role)
        {
            IQueryable<User> users = _userContext.Users;

            if (!string.IsNullOrEmpty(role))
            {
                users = users.Where(u => u.UserRole == role);
            }

            var userList = users.ToList();

            return Ok(userList);
        }
    }
}

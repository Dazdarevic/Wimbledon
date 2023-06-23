using LoginAndRegister.Interfaces;
using LoginAndRegister.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace LoginAndRegister.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {

        private readonly UserContext _userContext;
        private readonly IPhotoService _photoService;

        public PlayerController(UserContext userContext, IPhotoService photoService)
        {
            _userContext = userContext;
            _photoService = photoService;
        }

        [HttpPost("add-photo")]
        public async Task<IActionResult> UploadPhotoNew(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var uploadResult = await _photoService.AddPhotoAsync(file);

            if (uploadResult.Error != null)
            {
                // Handling error case
                return BadRequest(uploadResult.Error.Message);
            }

            // The photo was successfully uploaded
            var imageUrl = uploadResult.SecureUrl.ToString();
            var publicId = uploadResult.PublicId;

            var photo = new Player
            {
                Url = imageUrl,
                IsMain = false,
                PublicId = publicId,
            };

            _userContext.Player.Add(photo);
            await _userContext.SaveChangesAsync();

            // Perform further processing or save the photo object to the database

            return Ok(photo);
        }

        [HttpGet("ByLastName/{letter}")]
        public IActionResult GetPlayersByLastName(char letter)
        {
            if (_userContext.Player == null)
            {
                return NotFound();
            }
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            var players2 = _userContext.Player.Where(p => p.LastName.StartsWith(letter.ToString())).ToList();

            var players = _userContext.Player
                .Where(p => p.LastName.StartsWith(letter.ToString()))
                .ToList();

#pragma warning restore CS8602 // Dereference of a possibly null reference.
            return Ok(players);
        }


        [HttpGet]
        public IActionResult GetPlayers()
        {
            IQueryable<Player> player = _userContext.Player;
            var userList = player.ToList();

            return Ok(userList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            if (_userContext.Player == null)
            {
                return NotFound();
            }
            var player = await _userContext.Player.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }
            return player;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
            {
            _userContext.Player.Add(player);
            await _userContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlayer), new { id = player.Id }, player);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Player>> PutPlayer(int id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest();
            }
            _userContext.Entry(player).State = EntityState.Modified;
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

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Player>> DeletePlayer(int id)
        {
            var player = await _userContext.Player.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }
            _userContext.Player.Remove(player);
            await _userContext.SaveChangesAsync();

            return Ok();
        }


    }
}

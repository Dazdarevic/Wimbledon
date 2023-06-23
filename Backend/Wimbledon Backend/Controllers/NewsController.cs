using LoginAndRegister.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using LoginAndRegister.Interfaces;
using LoginAndRegister.Services;
using LoginAndRegister.DTOs;

namespace LoginAndRegister.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly UserContext _userContext;
        private readonly IPhotoService _photoService;

        public NewsController(UserContext userContext, IPhotoService photoService)
        {
            _userContext = userContext;
            _photoService = photoService;
        }

        [HttpGet]
        public IActionResult GetNews()
        {
            IQueryable<News> news = _userContext.News;
            var userList = news.ToList();

            return Ok(userList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<News>> GetNew(int id)
        {
            if (_userContext.News == null)
            {
                return NotFound();
            }
            var news = await _userContext.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }
            return news;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<News>> PostNew(News news)
        {
        _userContext.News.Add(news);
        await _userContext.SaveChangesAsync();

          return CreatedAtAction(nameof(GetNew), new { id = news.NewsID }, news);
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

            var photo = new News
            {
                Url = imageUrl,
                IsMain = false,
                PublicId = publicId
            };

            //_userContext.News.Add(photo);
            //await _userContext.SaveChangesAsync();

            // Perform further processing or save the photo object to the database

            return Ok(photo);
        }






        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<News>> PutNew(int id, News news)
        {
            if (id != news.NewsID)
            {
                return BadRequest();
            }
            _userContext.Entry(news).State = EntityState.Modified;
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
        public async Task<ActionResult<News>> DeleteNew(int id)
        {
            var news = await _userContext.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }
            _userContext.News.Remove(news);
            await _userContext.SaveChangesAsync();

            return Ok();
        }

    }
}

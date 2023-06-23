using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LoginAndRegister.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadImage : ControllerBase
    {
        [HttpPost]
        public string UploadImageByEditor([FromForm] IFormFile file)
        {
            try
            {
                // getting file original name
                string FileName = file.FileName;

                // combining GUID to create unique name before saving in wwwroot
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + FileName;

                // getting full path inside wwwroot/images
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/", FileName);

                // copying file
                file.CopyTo(new FileStream(imagePath, FileMode.Create));

                return "File Uploaded Successfully";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}

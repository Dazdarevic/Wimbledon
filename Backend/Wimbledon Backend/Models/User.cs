using System.ComponentModel.DataAnnotations;

namespace LoginAndRegister.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public string? UserPassword { get; set; }
        public string? UserRole { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }


        // Navigaciono svojstvo za povezivanje sa vestima
        public ICollection<News>? News { get; set; }


    }
}

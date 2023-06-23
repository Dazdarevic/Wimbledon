using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoginAndRegister.Models
{
    public class News
    {
        [Key]
        public int NewsID { get; set; }
        public string? Title { get; set; }
        public string? Subtitle { get; set; }
        public string? Text { get; set; }


        public string? Url { get; set; }
        public bool IsMain { get; set; }
        public string? PublicId { get; set; }

        public int AuthorID { get; set; }

        [ForeignKey("AuthorID")]
        public User? Author { get; set; }


    }
}

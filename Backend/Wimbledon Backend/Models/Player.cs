using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoginAndRegister.Models
{
    public class Player
    {
        [Key]
        public int Id { get; set; }

        public string? Url { get; set; }
        public bool IsMain { get; set; }
        public string? PublicId { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Country { get; set; }
        public string? Age { get; set; }
        public string? BirthDate { get; set; }
        public string? BirthPlace { get; set; }
        public string? Height { get; set; }
        public string? Weight { get; set; }
        public string? Plays { get; set; }
        public string? SingleRank { get; set; }
        public string? GrandSlam { get; set; }
        public string? ChampionshipsPlayed { get; set; }
        public string? BestSingle { get; set; }
        public string? BestDouble { get; set; }
        public string? YearsTurnedProp { get; set; }
        public string? Win { get; set; }
        public string? Loss { get; set; }
        public string? HighRankforSingle { get; set; }
        public string? HighRankForDouble { get; set; }


    }
}

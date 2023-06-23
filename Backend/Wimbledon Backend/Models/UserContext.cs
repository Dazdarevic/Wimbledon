using Microsoft.EntityFrameworkCore;

namespace LoginAndRegister.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Player> Player { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<News>()
                .HasOne(n => n.Author)
                .WithMany(u => u.News)
                .HasForeignKey(n => n.AuthorID)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Player>()
             .HasOne(p => p.User)
             .WithMany()
             .HasForeignKey(p => p.UserId);
            //.OnDelete(DeleteBehavior.Restrict);

          
        }

    }
}

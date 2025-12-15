using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentApi.Models;

namespace StudentApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Add dummy data (Seeding)
            modelBuilder.Entity<Student>().HasData(
                new Student { Id = 1, Name = "Alice Smith", Class = "10", Section = "A" },
                new Student { Id = 2, Name = "Bob Johnson", Class = "11", Section = "B" },
                new Student { Id = 3, Name = "Charlie Brown", Class = "10", Section = "B" }
            );
        }
    }
}
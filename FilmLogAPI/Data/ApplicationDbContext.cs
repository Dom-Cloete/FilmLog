using Microsoft.EntityFrameworkCore;
using FilmLogAPI.Models;

namespace FilmLogAPI.Data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    public DbSet<User> Users { get; set; }

    public DbSet<Movie> Movies { get; set; }
  }
}

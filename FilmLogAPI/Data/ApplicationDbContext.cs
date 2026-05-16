using Microsoft.EntityFrameworkCore;
using FilmLogAPI.Models;

namespace FilmLogAPI.Data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions options) : base(options) { }
    public DbSet<User> Users => Set<User>();
    public DbSet<WatchlistMovie> WatchlistMovies => Set<WatchlistMovie>();
    public DbSet<WatchedMovie> WatchedMovies => Set<WatchedMovie>();
  }
}

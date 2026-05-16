namespace FilmLogAPI.Models
{
  public class User
  {
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public List<WatchlistMovie>? WatchlistMovies { get; set; }
    public List<WatchedMovie>? WatchedMovies { get; set; }
  }
}

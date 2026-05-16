namespace FilmLogAPI.Models
{
  public class User
  {
    public int Id { get; set; }

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public List<Movie> Watchlist { get; set; } = new List<Movie>();

    public List<Movie> WatchedList { get; set; } = new List<Movie>();
  }
}

namespace FilmLogAPI.Models
{
  public class WatchedMovie
  {
    public int Id { get; set; }
    public string ImdbId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
    public string Poster { get; set; } = string.Empty;
    public string Actors { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public int TimesWatched { get; set; } = 1;
    public int UserId { get; set; }
    public User? User { get; set; }
  }
}

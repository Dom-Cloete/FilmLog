using System.Text.Json.Serialization;

namespace FilmLogAPI.DTOs
{
  public class MovieDto
  {
    public string ImdbId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
    public string Poster { get; set; } = string.Empty;
    public string Actors { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
  }
}

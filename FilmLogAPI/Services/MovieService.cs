using Newtonsoft.Json.Linq;

namespace FilmLogAPI.Services
{
  public class MovieService
  {
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public MovieService(HttpClient httpClient, IConfiguration configuration)
    {
      _httpClient = httpClient;
      _configuration = configuration;
    }

    public async Task<String> SearchMovie(string title)
    {
      string apiKey = _configuration["OMDb:ApiKey"]!;

      string url = $"https://www.omdbapi.com/?apikey={apiKey}&s={title}";

      var response = await _httpClient.GetAsync(url);
      return await response.Content.ReadAsStringAsync();
    }

    public async Task<String> GetMovieDetails(string title)
    {
      string apiKey = _configuration["OMDb:ApiKey"]!;

      string url = $"https://www.omdbapi.com/?apikey={apiKey}&t={title}";

      var response = await _httpClient.GetAsync(url);
      return await response.Content.ReadAsStringAsync();
    }
  }
}

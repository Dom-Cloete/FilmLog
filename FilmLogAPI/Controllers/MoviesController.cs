using FilmLogAPI.DTOs;
using FilmLogAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace FilmLogAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class MoviesController : Controller
  {
    private readonly MovieService _movieService;

    public MoviesController(MovieService movieService)
    {
      _movieService = movieService;
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string title)
    {
      var jsonString = await _movieService.SearchMovie(title);

      if (string.IsNullOrEmpty(jsonString))
        return NotFound();

      return Content(jsonString, "application/json");
    }

    [HttpGet("details")]
    public async Task<IActionResult> Details([FromQuery] string title)
    {
      var jsonString = await _movieService.GetMovieDetails(title);

      if (string.IsNullOrEmpty(jsonString))
        return NotFound();

      return Content(jsonString, "application/json");
    }
  }
}

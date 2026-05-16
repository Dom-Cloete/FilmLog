using FilmLogAPI.Data;
using FilmLogAPI.DTOs;
using FilmLogAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FilmLogAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class WatchedController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public WatchedController(ApplicationDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetWatched()
    {
      int userId = int.Parse(
          User.FindFirstValue(ClaimTypes.NameIdentifier)!);

      var movies = await _context.WatchedMovies
          .Where(w => w.UserId == userId)
          .ToListAsync();

      return Ok(movies);
    }

    [HttpPost]
    public async Task<IActionResult> AddWatched(MovieDto dto)
    {
      int userId = int.Parse(
          User.FindFirstValue(ClaimTypes.NameIdentifier)!);

      var existingMovie =
          await _context.WatchedMovies
          .FirstOrDefaultAsync(m =>
              m.ImdbId == dto.ImdbId &&
              m.UserId == userId);

      if (existingMovie != null)
      {
        existingMovie.TimesWatched++;

        await _context.SaveChangesAsync();

        return Ok(existingMovie);
      }

      var watchedMovie = new WatchedMovie
      {
        ImdbId = dto.ImdbId,
        Title = dto.Title,
        Year = dto.Year,
        Poster = dto.Poster,
        Actors = dto.Actors,
        Genre = dto.Genre,
        TimesWatched = 1,
        UserId = userId
      };

      _context.WatchedMovies.Add(watchedMovie);

      var watchlistMovie =
          await _context.WatchlistMovies
          .FirstOrDefaultAsync(m =>
              m.ImdbId == dto.ImdbId &&
              m.UserId == userId);

      if (watchlistMovie != null)
      {
        _context.WatchlistMovies.Remove(watchlistMovie);
      }

      await _context.SaveChangesAsync();

      return Ok(watchedMovie);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> IncrementWatchCount(int id)
    {
      int userId = int.Parse(
          User.FindFirstValue(ClaimTypes.NameIdentifier)!);

      var movie =
          await _context.WatchedMovies
          .FirstOrDefaultAsync(m =>
              m.Id == id &&
              m.UserId == userId);

      if (movie == null)
      {
        return NotFound();
      }

      movie.TimesWatched++;

      await _context.SaveChangesAsync();

      return Ok(movie);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWatched(int id)
    {
      int userId = int.Parse(
          User.FindFirstValue(ClaimTypes.NameIdentifier)!);

      var movie =
          await _context.WatchedMovies
          .FirstOrDefaultAsync(m =>
              m.Id == id &&
              m.UserId == userId);

      if (movie == null)
      {
        return NotFound();
      }

      _context.WatchedMovies.Remove(movie);

      await _context.SaveChangesAsync();

      return Ok("Movie removed");
    }

    [HttpPost("reset/{id}")]
    public async Task<IActionResult> ResetWatchCount(int id)
    {
      int userId = int.Parse(
          User.FindFirstValue(ClaimTypes.NameIdentifier)!);

      var movie =
          await _context.WatchedMovies
          .FirstOrDefaultAsync(m =>
              m.Id == id &&
              m.UserId == userId);

      if (movie == null)
      {
        return NotFound();
      }

      var watchlistMovie = new WatchlistMovie
      {
        ImdbId = movie.ImdbId,
        Title = movie.Title,
        Year = movie.Year,
        Poster = movie.Poster,
        Actors = movie.Actors,
        Genre = movie.Genre,
        UserId = userId
      };

      _context.WatchlistMovies.Add(watchlistMovie);

      _context.WatchedMovies.Remove(movie);

      await _context.SaveChangesAsync();

      return Ok("Counter reset");
    }
  }
}

using FilmLogAPI.Data;
using FilmLogAPI.DTOs;
using FilmLogAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;

namespace FilmLogAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class WatchlistController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public WatchlistController(ApplicationDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetWatchlist()
    {
      int userId = int.Parse(
          User.FindFirstValue(ClaimTypes.NameIdentifier)!);

      var movies = await _context.WatchlistMovies
          .Where(w => w.UserId == userId)
          .ToListAsync();

      return Ok(movies);
    }

    [HttpPost]
    public async Task<IActionResult> AddMovie(MovieDto dto)
    {
      int userId = int.Parse(
          User.FindFirstValue(ClaimTypes.NameIdentifier)!);

      bool exists = await _context.WatchlistMovies
          .AnyAsync(m =>
              m.ImdbId == dto.ImdbId &&
              m.UserId == userId);

      if (exists)
      {
        return BadRequest("Movie already exists");
      }

      var movie = new WatchlistMovie
      {
        ImdbId = dto.ImdbId,
        Title = dto.Title,
        Year = dto.Year,
        Poster = dto.Poster,
        Actors = dto.Actors,
        Genre = dto.Genre,
        UserId = userId
      };

      _context.WatchlistMovies.Add(movie);

      await _context.SaveChangesAsync();

      return Ok(movie);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveMovie(int id)
    {
      int userId = int.Parse(
          User.FindFirstValue(ClaimTypes.NameIdentifier)!);

      var movie = await _context.WatchlistMovies
          .FirstOrDefaultAsync(m =>
              m.Id == id &&
              m.UserId == userId);

      if (movie == null)
      {
        return NotFound();
      }

      _context.WatchlistMovies.Remove(movie);

      await _context.SaveChangesAsync();

      return Ok("Movie removed");
    }
  }
}

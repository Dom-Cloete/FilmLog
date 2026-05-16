using BCrypt.Net;
using FilmLogAPI.Data;
using FilmLogAPI.DTOs;
using FilmLogAPI.Models;
using FilmLogAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace FilmLogAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(
        ApplicationDbContext context,
        JwtService jwtService)
    {
      _context = context;
      _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
      var existingUser = await _context.Users
          .FirstOrDefaultAsync(u => u.Email == dto.Email);

      if (existingUser != null)
      {
        return BadRequest("User already exists");
      }

      var hashedPassword =
          BCrypt.Net.BCrypt.HashPassword(dto.Password);

      var user = new User
      {
        Email = dto.Email,
        PasswordHash = hashedPassword
      };

      _context.Users.Add(user);

      await _context.SaveChangesAsync();

      return Ok("Registration successful");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
      var user = await _context.Users
          .FirstOrDefaultAsync(u => u.Email == dto.Email);

      if (user == null)
      {
        return Unauthorized("Invalid email or password");
      }

      bool validPassword =
          BCrypt.Net.BCrypt.Verify(
              dto.Password,
              user.PasswordHash);

      if (!validPassword)
      {
        return Unauthorized("Invalid email or password");
      }

      var token = _jwtService.GenerateToken(user);

      return Ok(new AuthResponseDto
      {
        Token = token,
        Email = user.Email
      });
    }
  }
}

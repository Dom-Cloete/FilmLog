using FilmLogAPI.Controllers;
using FilmLogAPI.Data;
using FilmLogAPI.DTOs;
using FilmLogAPI.Models;
using FilmLogAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace FilmLogAPI.Tests
{
  public class AuthControllerTests
  {
    private static ApplicationDbContext CreateContext()
    {
      var options = new DbContextOptionsBuilder<ApplicationDbContext>()
          .UseInMemoryDatabase(Guid.NewGuid().ToString())
          .Options;

      return new ApplicationDbContext(options);
    }

    private static AuthController CreateController(ApplicationDbContext context)
    {
      var configuration = new ConfigurationBuilder()
          .AddInMemoryCollection(new Dictionary<string, string?>
          {
            ["Jwt:Key"] = "test-signing-key-that-is-long-enough-for-hmac-sha256",
            ["Jwt:Issuer"] = "FilmLogAPI",
            ["Jwt:Audience"] = "FilmLogUsers"
          })
          .Build();

      return new AuthController(context, new JwtService(configuration));
    }

    [Fact]
    public async Task Register_ReturnsOk_AndStoresHashedPassword()
    {
      using var context = CreateContext();
      var controller = CreateController(context);

      var result = await controller.Register(
          new RegisterDto { Email = "dom@example.com", Password = "Password123" });

      Assert.IsType<OkObjectResult>(result);

      var user = Assert.Single(context.Users);
      Assert.Equal("dom@example.com", user.Email);
      Assert.NotEqual("Password123", user.PasswordHash);
      Assert.True(BCrypt.Net.BCrypt.Verify("Password123", user.PasswordHash));
    }

    [Fact]
    public async Task Register_ReturnsBadRequest_WhenEmailAlreadyExists()
    {
      using var context = CreateContext();
      var controller = CreateController(context);

      await controller.Register(
          new RegisterDto { Email = "dom@example.com", Password = "Password123" });

      var result = await controller.Register(
          new RegisterDto { Email = "DOM@example.com", Password = "Other456" });

      Assert.IsType<BadRequestObjectResult>(result);
      Assert.Single(context.Users);
    }

    [Fact]
    public async Task Login_ReturnsToken_WithValidCredentials()
    {
      using var context = CreateContext();
      var controller = CreateController(context);

      await controller.Register(
          new RegisterDto { Email = "dom@example.com", Password = "Password123" });

      var result = await controller.Login(
          new LoginDto { Email = "dom@example.com", Password = "Password123" });

      var ok = Assert.IsType<OkObjectResult>(result);
      var response = Assert.IsType<AuthResponseDto>(ok.Value);
      Assert.False(string.IsNullOrEmpty(response.Token));
      Assert.Equal("dom@example.com", response.Email);
    }

    [Fact]
    public async Task Login_IgnoresEmailCase()
    {
      using var context = CreateContext();
      var controller = CreateController(context);

      await controller.Register(
          new RegisterDto { Email = "Dom@Example.com", Password = "Password123" });

      var result = await controller.Login(
          new LoginDto { Email = "Dom@Example.com", Password = "Password123" });

      Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task Login_ReturnsUnauthorized_WithWrongPassword()
    {
      using var context = CreateContext();
      var controller = CreateController(context);

      await controller.Register(
          new RegisterDto { Email = "dom@example.com", Password = "Password123" });

      var result = await controller.Login(
          new LoginDto { Email = "dom@example.com", Password = "WrongPassword" });

      Assert.IsType<UnauthorizedObjectResult>(result);
    }

    [Fact]
    public async Task Login_ReturnsUnauthorized_WhenUserDoesNotExist()
    {
      using var context = CreateContext();
      var controller = CreateController(context);

      var result = await controller.Login(
          new LoginDto { Email = "nobody@example.com", Password = "Password123" });

      Assert.IsType<UnauthorizedObjectResult>(result);
    }
  }
}

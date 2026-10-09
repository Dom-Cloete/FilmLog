using Microsoft.AspNetCore.Mvc;
using Moq;
using FilmLogAPI.Controllers;
using FilmLogAPI.Services;
using System.Threading.Tasks;
using Xunit;

namespace FilmLogAPI.Tests
{
  public class MoviesControllerTests
  {
    [Fact]
    public async Task Search_ReturnsOk_WhenMovieExists()
    {
      var mockService = new Mock<MovieService>(null, null);

      mockService
          .Setup(s => s.SearchMovie("batman"))
          .ReturnsAsync("{ \"Search\": [] }");

      var controller = new MoviesController(mockService.Object);

      var result = await controller.Search("batman");

      var okResult = Assert.IsType<ContentResult>(result);
      Assert.Equal("application/json", okResult.ContentType);
    }

    [Fact]
    public async Task Search_ReturnsNotFound_WhenEmpty()
    {
      var mockService = new Mock<MovieService>(null, null);

      mockService
          .Setup(s => s.SearchMovie("unknownmovie"))
          .ReturnsAsync("");

      var controller = new MoviesController(mockService.Object);

      var result = await controller.Search("unknownmovie");

      Assert.IsType<NotFoundResult>(result);
    }
  }
}

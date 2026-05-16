using Microsoft.AspNetCore.Mvc;

namespace FilmLogAPI.Controllers
{
  public class AuthController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }
  }
}

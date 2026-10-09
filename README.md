# FilmLog

A mobile-first film tracking app. You can search for movies, keep a watchlist, log what you've watched (and how many times), and see statistics about your viewing habits. It's an Ionic/Angular app backed by an ASP.NET Core Web API with JWT authentication. Movie data comes from the [OMDb API](https://www.omdbapi.com/).

Built for INF 354 (Assignment 3) at the University of Pretoria.

## Features

- **Register and log in**: accounts with BCrypt-hashed passwords. The app uses JWT tokens, which an HTTP interceptor attaches to every request.
- **Search**: find movies by title through OMDb.
- **Movie details**: poster, year, genre, actors and plot.
- **Watchlist**: save movies you want to watch, and remove them later.
- **Watched**: log movies you've seen, count repeat viewings, and reset the count.
- **Stats dashboard**: top genres (pie chart), average watch time per genre (bar chart) and your most-watched movies, built with Chart.js.

Each user only sees their own watchlist and watched list.

## Tech stack

| Layer | Technology |
|---|---|
| App | Ionic 8, Angular 20, Capacitor, Chart.js |
| API | ASP.NET Core Web API (.NET 8), JWT bearer auth, Swagger |
| Data | Entity Framework Core with SQL Server LocalDB |
| External | OMDb API |
| Tests | xUnit |

## API endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | | Create an account |
| POST | `/api/auth/login` | | Log in and receive a JWT |
| GET | `/api/movies/search?title=` | | Search OMDb by title |
| GET | `/api/movies/details?title=` | | Get full movie details |
| GET | `/api/watchlist` | ✔ | Your watchlist |
| POST | `/api/watchlist` | ✔ | Add to watchlist |
| DELETE | `/api/watchlist/{id}` | ✔ | Remove from watchlist |
| GET | `/api/watched` | ✔ | Your watched movies |
| POST | `/api/watched` | ✔ | Log a watched movie |
| PUT | `/api/watched/{id}` | ✔ | Update a watched movie |
| DELETE | `/api/watched/{id}` | ✔ | Remove a watched movie |
| POST | `/api/watched/reset/{id}` | ✔ | Reset the watch count |

## Running locally

### Prerequisites
- Visual Studio 2022 (with the **ASP.NET and web development** workload, which includes SQL Server LocalDB) or the .NET 8 SDK
- Node.js and the Ionic CLI (`npm install -g @ionic/cli`)
- A free OMDb API key from [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)

### 1. Start the API
1. Open `FilmLogAPI/FilmLogAPI.sln` in Visual Studio.
2. In `FilmLogAPI/FilmLogAPI/appsettings.json`, set `OMDb:ApiKey` to your key. Optionally, change `Jwt:Key` to your own long random string.
3. Create the database by running this in the **Package Manager Console**:
   ```
   Update-Database
   ```
   This creates `FilmLogDb` on `(localdb)\MSSQLLocalDB`.
4. Run the `https` profile. The API listens on `https://localhost:7171`, and Swagger is at `https://localhost:7171/swagger`.

### 2. Start the app
From the repository root:
```bash
npm install
ionic serve
```
The app talks to the API URL set in `src/environments/environment.ts`.

## Project structure

```
src/app/                  # Ionic/Angular app
├── login/, register/     # Authentication pages
├── tab-search/           # Search movies
├── tab-watchlist/        # Watchlist
├── tab-watched/          # Watched movies
├── tab-stats/            # Statistics dashboard
├── movie-details/
├── interceptors/         # JWT interceptor
└── services/             # auth, movie, watchlist and watched services
FilmLogAPI/
├── FilmLogAPI/           # ASP.NET Core Web API
│   ├── Controllers/      # Auth, Movies, Watchlist, Watched
│   ├── Services/         # JwtService, MovieService (OMDb)
│   ├── Data/, Models/, DTOs/, Migrations/
└── FilmLogAPI.Tests/     # xUnit tests
```

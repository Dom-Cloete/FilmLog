import { Component, OnInit } from '@angular/core';
import { WatchedService } from '../services/watched.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-tab-stats',
  templateUrl: './tab-stats.page.html',
  styleUrls: ['./tab-stats.page.scss'],
  standalone: false
})
export class TabStatsPage implements OnInit {

  watchedMovies: any[] = [];

  constructor(private watchedService: WatchedService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.watchedService.getWatched().subscribe((data: any[]) => {
      this.watchedMovies = data;

      this.buildGenreChart();
      this.buildWatchChart();
    });
  }

  buildGenreChart() {

    const genreCount: any = {};

    this.watchedMovies.forEach(movie => {
      if (!movie.genre) return;

      const genres = movie.genre.split(',').map((g: string) => g.trim());

      genres.forEach((g: string) => {
        genreCount[g] = (genreCount[g] || 0) + 1;
      });
    });

    const sorted = Object.entries(genreCount)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 6);

    new Chart('genreChart', {
      type: 'pie',
      data: {
        labels: sorted.map((x: any) => x[0]),
        datasets: [{
          data: sorted.map((x: any) => x[1]),
          backgroundColor: [
            '#054A29',
            '#7EB09B',
            '#519E8A',
            '#C5C9A4',
            '#BB7E5D',
            '#425147'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { weight: 'bold' }
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx: any) => {
                const label = ctx.label || '';
                const value = ctx.raw;
                return `${label}: ${value} movies`;
              }
            }
          }
        }
      }
    });
  }

  buildWatchChart() {

    const genreData: any = {};

    this.watchedMovies.forEach(movie => {

      if (!movie.genre) return;

      const timesWatched = movie.timesWatched || 1;

      const genres = movie.genre.split(',').map((g: string) => g.trim());

      genres.forEach((genre: string) => {

        if (!genreData[genre]) {
          genreData[genre] = {
            totalWatch: 0,
            count: 0
          };
        }

        genreData[genre].totalWatch += timesWatched;
        genreData[genre].count += 1;
      });
    });

    const labels = Object.keys(genreData);

    const averages = labels.map(g => {
      const data = genreData[g];
      return +(data.totalWatch / data.count).toFixed(2);
    });

    new Chart('watchChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Avg Watch Time',
          data: averages,
          backgroundColor: '#7EB09B',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx: any) => {
                return `Avg: ${ctx.raw} watches`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getTopMovies() {
    return [...this.watchedMovies]
      .sort((a, b) => (b.timesWatched || 1) - (a.timesWatched || 1))
      .slice(0, 5);
  }
}
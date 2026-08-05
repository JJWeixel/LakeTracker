using api.Data;
using api.Endpoints.Weather;
using api.Endpoints.Alerts;
using api.Endpoints.Waves;
using api.Endpoints.Stations;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using api.Ingestion;
using System.Security.Claims;

namespace api
{
        public class Program
    {

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            AddApiExplorer(builder);
            AddSwaggerGen(builder);
            AddDbContext(builder);
            AddServices(builder);
            AddControllers(builder);
            AddCurrentUser(builder);
            AddCorsPolicy(builder);

            RunApp(builder);
        }
        
        

        private static void AddApiExplorer(WebApplicationBuilder builder)
        {
            builder.Services.AddEndpointsApiExplorer();
        }

        private static void AddSwaggerGen(WebApplicationBuilder builder)
        {
            builder.Services.AddSwaggerGen(opt =>
            {
                opt.SwaggerDoc("v1", new OpenApiInfo { Title = "LakeTrackerApi", Version = "v1" });
            });
        }

        private static void AddDbContext(WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<LakeTrackerContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("SupabaseConnection")));
        }

        private static void AddServices(WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<WeatherServices>();
            builder.Services.AddScoped<AlertsServices>();
            builder.Services.AddScoped<WavesServices>();
            builder.Services.AddScoped<StationsServices>();
            builder.Services.AddHostedService<NoaaIngestionService>();
        }

        private static void AddControllers(WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
        }
        
        private static void AddCurrentUser(WebApplicationBuilder builder)
        {
            builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            builder.Services.AddTransient(sp =>
            {
                var accessor = sp.GetRequiredService<IHttpContextAccessor>();
                return accessor?.HttpContext?.User ?? new ClaimsPrincipal(new ClaimsIdentity());
            });
        }

        private static void AddCorsPolicy(WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowLocal", policy =>
                    policy
                        .WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());

                options.AddPolicy("AllowGithubPages", policy =>
                policy
                    .WithOrigins("https://laketracker.us",
                        "https://www.laketracker.us")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
        }

        private static void RunApp(WebApplicationBuilder builder)
        {
            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors("AllowLocal");
            }
            else 
            {
                app.UseCors("AllowGithubPages");
            }

            app.UseHttpsRedirection();
            app.MapControllers();
            
            app.Run();
        }
    }
}

using System.Security.Claims;
using api.Data;
using api.Endpoints.Weather;
using api.Endpoints.Alerts;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authorization;

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
            builder.Services.AddDbContext<LakeTrackerContext>();
        }

        private static void AddServices(WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<WeatherServices>();
            builder.Services.AddScoped<AlertsServices>();
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
                var user = accessor?.HttpContext?.User;
                return user ?? throw new InvalidOperationException("User not found");
            });
        }

        private static void AddCorsPolicy(WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                    policy
                        .WithOrigins("http://localhost:5173") //TODO: Update with your frontend URL
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
                app.UseCors("AllowAll");
            }
            else 
            {
                app.UseCors("AllowAll");
            }

            app.UseHttpsRedirection();
            app.MapControllers();
            
            app.Run();
        }
    }
}

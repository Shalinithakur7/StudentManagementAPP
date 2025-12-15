using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentApi.Data;
using StudentApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// 1. Add DB Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

// 2. Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// 3. Add JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = configuration["JwtSettings:Issuer"],
        ValidAudience = configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Secret"]))
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); 

builder.Services.AddControllers();
// 4. Add CORS for Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // Replace with your Angular URL
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ... rest of the setup
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // These two lines are correct for using the middleware:
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp"); // Enable CORS

app.UseAuthentication(); // Must be before UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
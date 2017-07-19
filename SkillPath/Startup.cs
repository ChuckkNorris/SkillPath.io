using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.IO;
using SkillPath.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Diagnostics;
using System.Text;
using SkillPath.Api.ErrorHandling;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using SkillPath.Middleware;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace SkillPath
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SkillPathContext>(options => options.UseSqlServer(Configuration["connection_string"]));
            services.AddScoped<CategoryService>();
            services.AddScoped<TutorialService>();
            services.AddSingleton<IConfiguration>(Configuration);

            services.AddAuthorization(options => {
               options.AddPolicy("Admin", policy => {
                    policy.RequireClaim("is_admin");
                   policy.Build();
                }); 
            });

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            app.UseCors(options => {
                options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });
            var cookieOptions = new CookieAuthenticationOptions()
            {
                AuthenticationScheme = "MyCookieMiddlewareInstance",
                LoginPath = "",
                Events = new CookieAuthenticationEvents {
					OnRedirectToLogin = async (context) => { context.Response.StatusCode = 401; await Task.FromResult(0); },
					OnRedirectToReturnUrl = async (context) => { context.Response.StatusCode = 401; await Task.FromResult(0); },
					OnRedirectToAccessDenied = async (context) => { context.Response.StatusCode = 401; await Task.FromResult(0); }
				},
                //AutomaticAuthenticate = true,
                AutomaticChallenge = true
            };
            
            app.UseCookieAuthentication(cookieOptions);

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 &&
                   !Path.HasExtension(context.Request.Path.Value) &&
                   !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });
            app.UseMiddleware<AuthorizeRequest>();

            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = 500;
                    context.Response.ContentType = "application/json";
                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    if (error != null)
                    {
                        var ex = error.Error;

                        await context.Response.WriteAsync(new SkillPathError()
                        {
                            ErrorCode = 1,
                            ErrorMessage = ex.Message
                        }.ToString(), Encoding.UTF8);
                    }
                });
            });
            app.UseMvc();
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}

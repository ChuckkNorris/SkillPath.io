

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace SkillPath.Middleware {
    public class AuthorizeRequest {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;
        private readonly string _username;
        private readonly string _password;
         private readonly string _adminUsername;
        private readonly string _adminPassword;
        
        public AuthorizeRequest(RequestDelegate next, IConfiguration config) {
            _next = next;
            _config = config;
            _username = this._config["auth_username"];
            _password = this._config["auth_password"];
             _adminUsername = this._config["admin_username"];
            _adminPassword = this._config["admin_password"];
        }
        const string IS_ADMIN = "is_admin";
        public async Task Invoke(HttpContext context)
        {
            
            if (context.Request.Path.Value.StartsWith("/api/")) {
                string authHeader = context.Request.Headers["Authorization"];
                Console.WriteLine($"Auth Header: {authHeader}");
                if (context.User.HasClaim(IS_ADMIN, "true")) {
                    Console.WriteLine("ADMIN");
                    Console.WriteLine("Claim Type: " + context.User.Claims.FirstOrDefault()?.Type);
                    await _next.Invoke(context);
                }
                else if (authHeader != null && authHeader.StartsWith("Basic")) {
                    //Extract credentials
                    string encodedUsernamePassword = authHeader.Substring("Basic ".Length).Trim();
                    Encoding encoding = Encoding.GetEncoding("iso-8859-1");
                    string usernamePassword = encoding.GetString(Convert.FromBase64String(encodedUsernamePassword));
                    int seperatorIndex = usernamePassword.IndexOf(':');
                    var username = usernamePassword.Substring(0, seperatorIndex);
                    var password = usernamePassword.Substring(seperatorIndex + 1);
                    Console.WriteLine(username + password);
                    Console.WriteLine(_username + _password);
                    if(username == _username && password == _password)
                        await _next.Invoke(context);
                    else if (username == _adminUsername && password == _adminPassword) {
                        
                        var principal = new ClaimsPrincipal();
                        var adminClaims = new List<Claim> { new Claim(IS_ADMIN, "true") };
                        principal.AddIdentity(new ClaimsIdentity(adminClaims));
                        await context.Authentication.SignInAsync("MyCookieMiddlewareInstance", principal);
                        
                       await _next.Invoke(context);
                    }
                    else {
                        context.Response.StatusCode = 401; //Unauthorized
                        return;
                    }
                }
                else {
                    // no authorization header
                    context.Response.StatusCode = 401; //Unauthorized
                    return;
                }
            }
            else 
                await _next.Invoke(context);
        }


    }
}
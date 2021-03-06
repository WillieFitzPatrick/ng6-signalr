﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.AspNetCore.Authentication.JwtBearer;

using server.Hubs;
using server.Models;

namespace server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var cnnString = "server;" + 
                  "Initial Catalog=db;" + 
                  "User Id=user;"+
                  "Password=password;";
            services.AddDbContext<dataContext>(opt => opt.UseSqlServer(cnnString));

            services.AddMvc()
                    //.SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                    .AddJsonOptions(options => {
                       options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                       options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    });   

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
 
            app.UseCors(
                options => options.AllowAnyOrigin().AllowAnyHeader()
                                                   .AllowAnyMethod()
                                                   .AllowCredentials()
            );
            app.UseSignalR(routes =>
            {
                routes.MapHub<cacheHub>("/cacheHub");
            });
            
            app.UseMvc();
        }
    }
}

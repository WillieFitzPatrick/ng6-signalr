using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using server.Hubs;

namespace server.Controllers
{
   [Route("api/[controller]")]
   [Controller]
   public class ClientesController : ControllerBase
   {
      private readonly dataContext _context;
      private readonly IHubContext<cacheHub> _hubContext;

      public ClientesController(dataContext context, IHubContext<cacheHub> hubContext)
      {
         _context = context;
         _hubContext = hubContext;

      }
      // //[Authorize]
      [HttpGet]
      public IEnumerable<ICliente> GetAll()
      {

         
         return _context.Clientes
                        .Include( c => c.TipoDoc)
                        .Include( c => c.CondicionIVA)
                        .ToList();
      }

      //[Authorize]
      [HttpGet("{Id}", Name = "GetCliente")]
      public IActionResult GetById(int Id)
      {

         ICliente dataRow;
         if (Id == 0)
         {
            dataRow = new ICliente();
         }
         else
         {
            dataRow = _context.Clientes
                              .Include( c => c.TipoDoc)
                              .Include( c => c.CondicionIVA)
                              .FirstOrDefault(data => data.Id == Id);
         }

         if (dataRow == null)
         {
            return NotFound();
         }
         return new ObjectResult(dataRow);
      }


      //[Authorize]
      [HttpPost]
      public IActionResult Create([FromBody] ICliente postData)
      {
         if (postData == null)
         {
            return BadRequest();
         }
         postData.TipoDoc = _context.TiposDoc.Find(postData.TipoDoc.Id);
         postData.CondicionIVA = _context.CondicionesIVA.Find(postData.CondicionIVA.Id);
         
         _context.Clientes.Add(postData);
         _context.SaveChanges();
         _hubContext.Clients.All.SendAsync("cacheUpdate", "Clientes");

         return CreatedAtRoute("GetCliente", new { Id = postData.Id }, postData);
      }

      //[Authorize]
      [HttpPut("{Id}")]
      public IActionResult Update(int Id, [FromBody] ICliente putData)
      {
         if (putData == null || putData.Id != Id)
         {
            return BadRequest();
         }

         var db_data = _context.Clientes.FirstOrDefault(data => data.Id == Id);
         if (db_data == null)
         {
            return NotFound();
         }

         db_data.Fantasia = putData.Fantasia;
         db_data.Cliente = putData.Cliente;
         db_data.Calle = putData.Calle;
         db_data.CodPos = putData.CodPos;
         db_data.Ciudad = putData.Ciudad;
         db_data.Provincia = putData.Provincia;
         db_data.Telefono = putData.Telefono;
         db_data.Mail = putData.Mail;
         db_data.NroDoc = putData.NroDoc;
         db_data.TipoDoc = _context.TiposDoc.Find(putData.TipoDoc.Id);
         db_data.CondicionIVA = _context.CondicionesIVA.Find(putData.CondicionIVA.Id);
         db_data.Estado = putData.Estado;

         _context.Clientes.Update(db_data);
         _context.SaveChanges();
         _hubContext.Clients.All.SendAsync("cacheUpdate", "Clientes");
         return new NoContentResult();
      }

      //[Authorize]
      [HttpDelete("{Id}")]
      public IActionResult Delete(int Id)
      {
         var db_data = _context.Clientes.First(data => data.Id == Id);
         if (db_data == null)
         {
            return NotFound();
         }
         _context.Clientes.Remove(db_data);
         _context.SaveChanges();
         _hubContext.Clients.All.SendAsync("cacheUpdate", "Clientes");
         return new NoContentResult();
      }

   }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers
{
   [Route("api/[controller]")]
   [Controller]
   public class TiposDocController : ControllerBase
   {
      private readonly dataContext _context;

      public TiposDocController(dataContext context)
      {
         _context = context;

      }
      // //[Authorize]
      [HttpGet]
      public IEnumerable<ITipoDoc> GetAll()
      {
         return _context.TiposDoc
                        .ToList();
      }
      
      //[Authorize]
      [HttpGet("{Id}", Name = "GetTipoDoc")]
      public IActionResult GetById(int Id)
      {

         ITipoDoc dataRow;
         if (Id == 0){
            dataRow = new ITipoDoc();
         }
         else {
            dataRow = _context.TiposDoc
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
      public IActionResult Create([FromBody] ITipoDoc postData)
      {
         if (postData == null)
         {
            return BadRequest();
         }
         _context.TiposDoc.Add(postData);
         _context.SaveChanges();

         return CreatedAtRoute("GetTiposDoc", new { Id = postData.Id }, postData);
      }

      //[Authorize]
      [HttpPut("{Id}")]
      public IActionResult Update(int Id, [FromBody] ITipoDoc putData)
      {
         if (putData == null || putData.Id != Id)
         {
            return BadRequest();
         }

         var db_data = _context.TiposDoc.FirstOrDefault(data => data.Id == Id);
         if (db_data == null)
         {
            return NotFound();
         }

         db_data.Codigo = putData.Codigo;
         db_data.Documento = putData.Documento;
         db_data.Estado = putData.Estado;

         _context.TiposDoc.Update(db_data);
         _context.SaveChanges();
         return new NoContentResult();
      }

      //[Authorize]
      [HttpDelete("{Id}")]
      public IActionResult Delete(int Id)
      {
         var db_data = _context.TiposDoc.First(data => data.Id == Id);
         if (db_data == null)
         {
            return NotFound();
         }
         _context.TiposDoc.Remove(db_data);
         _context.SaveChanges();
         return new NoContentResult();
      }

   }
}

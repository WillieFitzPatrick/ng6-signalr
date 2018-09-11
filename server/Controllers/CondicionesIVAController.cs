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
   public class CondicionesIVAController : ControllerBase
   {
      private readonly dataContext _context;

      public CondicionesIVAController(dataContext context)
      {
         _context = context;

      }
      // //[Authorize]
      [HttpGet]
      public IEnumerable<ICondicionIVA> GetAll()
      {
         return _context.CondicionesIVA
                        .ToList();
      }
      
      //[Authorize]
      [HttpGet("{Id}", Name = "GetCondicionesIVA")]
      public IActionResult GetById(int Id)
      {

         ICondicionIVA dataRow;
         if (Id == 0){
            dataRow = new ICondicionIVA();
         }
         else {
            dataRow = _context.CondicionesIVA
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
      public IActionResult Create([FromBody] ICondicionIVA postData)
      {
         if (postData == null)
         {
            return BadRequest();
         }
         _context.CondicionesIVA.Add(postData);
         _context.SaveChanges();

         return CreatedAtRoute("GetCondicionesIVA", new { Id = postData.Id }, postData);
      }

      //[Authorize]
      [HttpPut("{Id}")]
      public IActionResult Update(int Id, [FromBody] ICondicionIVA putData)
      {
         if (putData == null || putData.Id != Id)
         {
            return BadRequest();
         }

         var db_data = _context.CondicionesIVA.FirstOrDefault(data => data.Id == Id);
         if (db_data == null)
         {
            return NotFound();
         }

         db_data.Codigo = putData.Codigo;
         db_data.CondicionIVA = putData.CondicionIVA;
         db_data.Estado = putData.Estado;

         _context.CondicionesIVA.Update(db_data);
         _context.SaveChanges();
         return new NoContentResult();
      }

      //[Authorize]
      [HttpDelete("{Id}")]
      public IActionResult Delete(int Id)
      {
         var db_data = _context.CondicionesIVA.First(data => data.Id == Id);
         if (db_data == null)
         {
            return NotFound();
         }
         _context.CondicionesIVA.Remove(db_data);
         _context.SaveChanges();
         return new NoContentResult();
      }

   }
}

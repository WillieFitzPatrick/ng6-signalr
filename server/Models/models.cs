using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;

namespace server.Models
{
   public class ITipoDoc
   {
      [Key]
      public int Id { get; set; }
      public int Codigo { get; set; }
      public string Documento { get; set; }
      public int Estado { get; set; }
   }

   public class ICondicionIVA
   {
      [Key]
      public int Id { get; set; }
      public int Codigo { get; set; }
      public string CondicionIVA { get; set; }
      public int Estado { get; set; }
   }

   public class ICliente
   {
      [Key]
      public int Id { get; set; }
      public string Fantasia { get; set; }
      public string Cliente { get; set; }
      public string Calle { get; set; }
      public string CodPos { get; set; }
      public string Ciudad { get; set; }
      public string Provincia { get; set; }
      public string Telefono { get; set; }
      public string Mail { get; set; }
      public ITipoDoc TipoDoc { get; set; }
      public string NroDoc { get; set; }
      public ICondicionIVA CondicionIVA { get; set; }
      public int Estado { get; set; }
   }



   

   //    [Column(TypeName = "decimal(18, 2)")]
   //    public decimal Valor { get; set; }

   //    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]




}



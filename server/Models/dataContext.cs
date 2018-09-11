using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class dataContext : DbContext
    {
        public dataContext(DbContextOptions<dataContext> options)
            : base(options)
        {
        }

        public DbSet<ITipoDoc> TiposDoc { get; set; }
        public DbSet<ICondicionIVA> CondicionesIVA { get; set; }
        public DbSet<ICliente> Clientes { get; set; }

    }
}
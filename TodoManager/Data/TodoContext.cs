using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TodoManager.Models;

namespace TodoManager.Data
{
    public class TodoContext : DbContext
    {
        public DbSet<Todo> Todos { get; set; }
    }
}
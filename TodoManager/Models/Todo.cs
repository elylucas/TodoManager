using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TodoManager.Models
{
    public class Todo
    {
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool Done { get; set; }
    }
}
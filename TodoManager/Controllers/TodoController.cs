using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TodoManager.Data;
using TodoManager.Infrastructure;
using TodoManager.Models;

namespace TodoManager.Controllers
{
    public class TodoController : ApiController
    {
        private TodoContext _ctx;

        public TodoController()
        {
            _ctx = new TodoContext();
        }


        // GET api/todo
        public IEnumerable<Todo> Get()
        {
            return _ctx.Todos;
        }

        // GET api/todo/5
        public HttpResponseMessage Get(int id)
        {
            var todo = _ctx.Todos.Where(x => x.Id == id).SingleOrDefault();
            if (todo == null)
                return Request.CreateResponse(HttpStatusCode.NotFound);
            return Request.CreateResponse(HttpStatusCode.OK, todo);
        }

        // POST api/todo
        public HttpResponseMessage Post(Todo todo)
        {
            _ctx.Todos.Add(todo);
            _ctx.SaveChanges();
            var response = Request.CreateResponse(HttpStatusCode.OK, todo);
            response.Headers.Location = new Uri(Request.RequestUri, "/api/todo/" + todo.Id);
            return response;
        }

        // PUT api/todo/5
        public HttpResponseMessage Put(Todo todo)
        {
            _ctx.Entry(todo).State = EntityState.Modified;
            _ctx.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, todo);
        }

        // DELETE api/todo/5
        public HttpResponseMessage Delete(int id)
        {
            var todo = _ctx.Todos.Find(id);
            _ctx.Todos.Remove(todo);
            _ctx.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, todo);
        }
    }
}

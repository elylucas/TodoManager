using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace TodoManager.Infrastructure
{
    public class HttpNotFoundException : HttpResponseException
    {
        public HttpNotFoundException() : base(new HttpResponseMessage(HttpStatusCode.NotFound))
        {
            
        }
    }
}
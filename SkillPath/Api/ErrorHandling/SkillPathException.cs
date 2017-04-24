using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.ErrorHandling
{
    public class SkillPathException : Exception
    {
		public SkillPathException(string message, HttpStatusCode? statusCode = null) : base(message) {
			if (statusCode.HasValue)
				this.StatusCode = statusCode.Value;
		}
		public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.Conflict;

	}
}

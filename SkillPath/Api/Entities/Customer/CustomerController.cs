using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.Entities.Customer
{
    [Route("api/[Controller]")]
    public class CustomerController : Controller {

    public CustomerController() {

    }
        [HttpGet]
        public IEnumerable<string> GetCustomers() {
            // _config["connection_string"]
            //var toReturn = new List<string>();
            //toReturn.Add("Joe");
            //return toReturn;
            return new string[] { "Joe", "hank" };
        }
    }
}

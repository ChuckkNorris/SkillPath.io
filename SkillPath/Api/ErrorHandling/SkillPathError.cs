using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.ErrorHandling
{
    public class SkillPathError
    {
		public int ErrorCode { get; set; } = 0;
		public string ErrorMessage { get; set; }
	}
}

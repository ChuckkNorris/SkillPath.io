using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.Entities
{
    public abstract class BaseModel
    {
		[Key]
		public Guid Id { get; set; }
	}
}

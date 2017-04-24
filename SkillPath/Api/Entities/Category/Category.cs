using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.Entities
{
    public class Category : BaseModel {
		public string Name { get; set; }
		public string Description { get; set; }
		public string Icon { get; set; }
		
		public int Tier { get; set; }
		
		//[ForeignKey("ParentId")]
		public Category Parent { get; set; }
		public Guid? ParentId { get; set; }
	}
}

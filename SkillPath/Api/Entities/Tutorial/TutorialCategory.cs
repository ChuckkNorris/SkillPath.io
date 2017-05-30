using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.Entities
{
    public class TutorialCategory : BaseModel {
        
        [ForeignKey("TutorialId")]
        public Tutorial Tutorial { get; set; }
        public Guid TutorialId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
        public Guid CategoryId { get; set; }
	}
}

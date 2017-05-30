using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.Entities
{
	[Route("api/[Controller]/[Action]")]
    public class TutorialController : Controller {
		private readonly TutorialService _tutorialService;

		public TutorialController(TutorialService tutorialService) {
			_tutorialService = tutorialService;
		}
       
		[HttpPost]
		public async Task Save([FromBody]Tutorial category) {
			await _tutorialService.SaveTutorial(category);
		}

		[HttpGet]
		public async Task<IEnumerable<Tutorial>> Get(int page, Guid? parentCategoryId = null) {
			IEnumerable<Tutorial> toReturn;
			if (parentCategoryId != null) {
				toReturn = await _tutorialService.FindInCategory(parentCategoryId.Value);
			}
			else {
				toReturn = await _tutorialService.GetTutorials(page);
			}
			return toReturn;
		}

	
    }

}

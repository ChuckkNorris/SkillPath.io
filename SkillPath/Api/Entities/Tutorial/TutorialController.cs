using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

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
		public async Task<Tutorial> GetTutorial(Guid id) {
			Tutorial toReturn;
			toReturn = await _tutorialService.GetTutorial(id);
			return toReturn;
		}

		[Authorize("Admin")]
		[HttpGet]
		public async Task<IEnumerable<Tutorial>> Get(int page, Guid? parentCategoryId = null) {
			IEnumerable<Tutorial> toReturn;
			toReturn = await _tutorialService.GetTutorials(page, parentCategoryId);
			return toReturn;
		}

		[HttpGet]
		public async Task<bool> DoesTutorialExist(string tutorialLinkUrl) {
			return await _tutorialService.DoesTutorialExist(tutorialLinkUrl);
		} 
	
    }

}

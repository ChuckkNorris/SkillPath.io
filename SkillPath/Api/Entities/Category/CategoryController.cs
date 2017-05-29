using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.Entities
{
	[Route("api/[Controller]/[Action]")]
    public class CategoryController : Controller {
		private readonly CategoryService _categoryService;

		public CategoryController(CategoryService categoryService) {
			_categoryService = categoryService;
		}
        [HttpGet]
		public async Task<IEnumerable<Category>> Find(int tier) {
			var toReturn =  await _categoryService.FindInTier(tier);
			return toReturn.ToArray();
		}

		[HttpPost]
		public async Task Save([FromBody]Category category) {
			await _categoryService.SaveCategory(category);
		}

		[HttpGet]
		public async Task<IEnumerable<Category>> GetChildCategories([FromQuery]Guid selectedCategoryId) {
			return await _categoryService.GetChildCategories(selectedCategoryId);
		}

    }

}

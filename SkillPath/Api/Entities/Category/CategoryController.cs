using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace SkillPath.Api.Entities
{
	[Route("api/[Controller]/[Action]")]
    public class CategoryController : Controller {
		private readonly CategoryService _categoryService;

		public CategoryController(CategoryService categoryService) {
			_categoryService = categoryService;
		}
        [HttpGet]
		public async Task<IEnumerable<Category>> Find(int tier, bool getEmpty = false) {
			var toReturn =  await _categoryService.FindInTier(tier, getEmpty);
			return toReturn.ToArray();
		}

		[HttpGet]
		public async Task<IEnumerable<Category>> GetChildCategories([FromQuery]Guid selectedCategoryId, bool getEmpty = false) {
			return await _categoryService.GetChildCategories(selectedCategoryId, getEmpty);
		}

		[Authorize("Admin")]
		[HttpPost]
		public async Task Save([FromBody]Category category) {
			await _categoryService.SaveCategory(category);
		}
		[Authorize("Admin")]
		[HttpPut]
		public async Task Update([FromBody]Category updatedCategory) {
			await _categoryService.UpdateCategory(updatedCategory);
		}

		[Authorize("Admin")]
		[HttpPost]
		public async Task Delete([FromBody]dynamic category) {
			Guid categoryId = category.categoryId;
			await _categoryService.Delete(categoryId);
		}


    }

}

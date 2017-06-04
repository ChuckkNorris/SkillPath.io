using Microsoft.EntityFrameworkCore;
using SkillPath.Api.ErrorHandling;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;

namespace SkillPath.Api.Entities
{
    public class CategoryService {
		private readonly SkillPathContext _context;
		public CategoryService(SkillPathContext context) {
			_context = context;
		}

		public async Task SaveCategory(Category categoryToSave) {
			Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(categoryToSave));
			var existingCategory = await _context.Categories
				.FirstOrDefaultAsync(cat => cat.Name == categoryToSave.Name 
					&& cat.Tier == categoryToSave.Tier);
			if (existingCategory != null)
				throw new SkillPathException("That category already exists");

			_context.Categories.Add(categoryToSave);
			await _context.SaveChangesAsync();
		}

		public async Task<IEnumerable<Category>> FindInTier(int tier, bool getEmpty = false) {
			IEnumerable<Category> toReturn;
			var query = Find(cat => cat.Tier == tier);
			Console.WriteLine(getEmpty);
			if (!getEmpty) {
				query = query.Where(cat => cat.TutorialCategories.Any());
			}
			toReturn = await query.ToListAsync();
			return toReturn;
		}

		public async Task<IEnumerable<Category>> GetChildCategories(Guid selectedCategoryId, bool getEmpty = false) {
			IEnumerable<Category> toReturn;
			var query = Find(cat => 
				cat.ParentId == selectedCategoryId);
				if (!getEmpty) {
					query = query.Where(cat => cat.TutorialCategories.Any());
				}
			toReturn = await query.ToListAsync();
			return toReturn;
		}

		
	
	

		public IQueryable<Category> Find(Expression<Func<Category, bool>> predicate) {
			return _context.Categories.Where(predicate);
		}
	}
}

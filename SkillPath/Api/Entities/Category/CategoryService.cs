using Microsoft.EntityFrameworkCore;
using SkillPath.Api.ErrorHandling;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

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

		public async Task<IEnumerable<Category>> FindInTier(int tier) {
			 return await _context.Categories.Where(cat => cat.Tier == tier).ToListAsync();
		}

		public async Task<IEnumerable<Category>> GetChildCategories(Guid selectedCategoryId) {
			
			return await Find(cat => cat.ParentId == selectedCategoryId).ToListAsync();
		}
	

		public IQueryable<Category> Find(Expression<Func<Category, bool>> predicate) {
			return _context.Categories.Where(predicate);
		}
	}
}

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
					&& cat.Tier == categoryToSave.Tier && cat.ParentId == categoryToSave.ParentId);
			if (existingCategory != null)
				throw new SkillPathException("That category already exists");

			_context.Categories.Add(categoryToSave);
			await _context.SaveChangesAsync();
		}

		public async Task UpdateCategory(Category updatedCategory) {
			var existingCategory = await _context.Categories.FindAsync(updatedCategory.Id);
			if (existingCategory != null) {
				existingCategory.Description = updatedCategory.Description;
				existingCategory.Icon = updatedCategory.Icon;
				existingCategory.Name = updatedCategory.Name;
				await _context.SaveChangesAsync();
			}
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

		public async Task Delete(Guid categoryId) {
			var existingCategory = await _context.Categories.FindAsync(categoryId);
			Console.WriteLine(existingCategory?.Name);
			if (existingCategory != null) {
				_context.Categories.Remove(existingCategory);
				await _context.SaveChangesAsync();
			}
		}
	}
}

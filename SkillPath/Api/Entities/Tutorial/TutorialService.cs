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
    public class TutorialService {
		private readonly SkillPathContext _context;
		public TutorialService(SkillPathContext context) {
			_context = context;
		}

		public async Task SaveTutorial(Tutorial tutorialToSave) {
			_context.Tutorials.Add(tutorialToSave);
			await _context.SaveChangesAsync();
		}
		public async Task<IEnumerable<Tutorial>> FindInCategory(Guid categoryId) {
			return await Find(tut => tut.TutorialCategories.Any(tutCat => tutCat.CategoryId == categoryId)).ToListAsync();
		}

		public IQueryable<Tutorial> Find(Expression<Func<Tutorial, bool>> predicate) {
			return _context.Tutorials.Include(tut => tut.TutorialCategories).Where(predicate);
		}
	}
}

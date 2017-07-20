using Microsoft.EntityFrameworkCore;
using SkillPath.Api.ErrorHandling;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using ReadSharp;

namespace SkillPath.Api.Entities
{
    public class TutorialService {
		private readonly SkillPathContext _context;
		public TutorialService(SkillPathContext context) {
			_context = context;
		}

		public async Task SaveTutorial(Tutorial tutorial) {
			tutorial.UpdateCategories();
			_context.Tutorials.Add(tutorial);
			await _context.SaveChangesAsync();
		}

		public async Task<Tutorial> GetTutorial(Guid id) {
			var toReturn = await Find(tut => tut.Id == id).FirstOrDefaultAsync();
			return MapTutorial(toReturn);
		}

		public async Task<IEnumerable<Tutorial>> GetTutorials(int page, Guid? categoryId) {
			IEnumerable<Tutorial> toReturn = null;
			IQueryable<Tutorial> tutorialQuery;
			int countPerPage = 20;
			int numberToSkip = (page - 1) * countPerPage;
			if (categoryId != null)
				tutorialQuery = Find(tut => tut.TutorialCategories.Any(tutCat => tutCat.CategoryId == categoryId));
			else
				tutorialQuery = Find();
			toReturn = await tutorialQuery
				.OrderByDescending(x => x.DateCreated)
				.Skip(numberToSkip)
				.Take(countPerPage)
				.ToListAsync();
			return toReturn.Select(tut => MapTutorial(tut));
		}

		public async Task<Article> GetArticleInfo(string articleUrl)
		{
			var reader = new Reader();
			Article article = null;
			try {
				article = await reader.Read(new Uri(articleUrl));
			}
			catch (ReadException exc) { }
			return article;
		}

		public async Task<bool> DoesTutorialExist(string tutorialLinkUrl) {
			bool toReturn = false;
			string baseUrlToCheck = tutorialLinkUrl?.Split('?').FirstOrDefault();
			var matchingTutorial = await _context.Tutorials.FirstOrDefaultAsync(tut => tut.LinkUrl == baseUrlToCheck);
			if (matchingTutorial != null)
				toReturn = true;
			return toReturn;
		}

		private Tutorial MapTutorial(Tutorial tutorial) {
			var namedCategories = new List<TutorialCategory>();
			foreach (var tutCat in tutorial.TutorialCategories)
			{
				var newTutCat = new TutorialCategory() {
					Id = tutCat.Category?.Id ?? Guid.Empty,
					CategoryId = tutCat.CategoryId,
					TutorialId = tutCat.TutorialId,
					Name = tutCat.Category?.Name,
					Icon = tutCat.Category?.Icon
				};
				namedCategories.Add(newTutCat);
			}
			tutorial.TutorialCategories = namedCategories;
			return tutorial;
		}

		public IQueryable<Tutorial> Find(Expression<Func<Tutorial, bool>> predicate = null) {
			IQueryable<Tutorial> toReturn = _context.Tutorials
				.Include(tut => tut.TutorialCategories)
				.ThenInclude(tutCat => tutCat.Category);
				if (predicate != null)
					toReturn = toReturn.Where(predicate);
			return toReturn;
		}
	}
}

using ReadSharp;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.Entities
{
    public class Tutorial : BaseModel {
		public string Title { get; set; }
		public string Description { get; set; }
		public string LinkUrl { get; set; }

		public string ImageUrl { get; set; }
		
		public int Tier { get; set; }
		public IEnumerable<TutorialCategory> TutorialCategories { get; set; }
		
		public void UpdateCategories() {
			
			
			var minifiedTutorialCategories = new List<TutorialCategory>();
			foreach (var tutCat in this.TutorialCategories) {
				minifiedTutorialCategories.Add(new TutorialCategory() {CategoryId = tutCat.Id});
			}
			this.TutorialCategories = minifiedTutorialCategories;
		}

		public void PopulateWithArticle(Article article) {
			this.Title = article?.Title ?? this.Title;
			this.Description = article?.Description ?? this.Description;
			this.ImageUrl = article?.FrontImage?.AbsoluteUri ?? this.ImageUrl;
		}


	}
}

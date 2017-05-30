using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPath.Api.Entities
{
    public class SkillPathContext : DbContext {
		public SkillPathContext(DbContextOptions<SkillPathContext> options) : base(options) { }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Tutorial> Tutorials { get; set; }
		public DbSet<TutorialCategory> TutorialCategories { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
			modelBuilder.Entity<Category>(category => {
				category.HasOne(cat => cat.Parent)
				.WithMany()
				.HasForeignKey(e => e.ParentId)
				.IsRequired(false)
				.OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Restrict);
			});
		}

	}
}

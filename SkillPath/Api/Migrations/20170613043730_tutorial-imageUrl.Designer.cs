using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SkillPath.Api.Entities;

namespace SkillPath.api.Migrations
{
    [DbContext(typeof(SkillPathContext))]
    [Migration("20170613043730_tutorial-imageUrl")]
    partial class tutorialimageUrl
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SkillPath.Api.Entities.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Icon");

                    b.Property<string>("Name");

                    b.Property<Guid?>("ParentId");

                    b.Property<int>("Tier");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("SkillPath.Api.Entities.Tutorial", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("LinkUrl");

                    b.Property<int>("Tier");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Tutorials");
                });

            modelBuilder.Entity("SkillPath.Api.Entities.TutorialCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CategoryId");

                    b.Property<Guid>("TutorialId");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("TutorialId");

                    b.ToTable("TutorialCategories");
                });

            modelBuilder.Entity("SkillPath.Api.Entities.Category", b =>
                {
                    b.HasOne("SkillPath.Api.Entities.Category", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");
                });

            modelBuilder.Entity("SkillPath.Api.Entities.TutorialCategory", b =>
                {
                    b.HasOne("SkillPath.Api.Entities.Category", "Category")
                        .WithMany("TutorialCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkillPath.Api.Entities.Tutorial", "Tutorial")
                        .WithMany("TutorialCategories")
                        .HasForeignKey("TutorialId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}

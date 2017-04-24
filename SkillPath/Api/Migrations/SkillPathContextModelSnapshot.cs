using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SkillPath.Api.Entities;

namespace SkillPath.api.Migrations
{
    [DbContext(typeof(SkillPathContext))]
    partial class SkillPathContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("SkillPath.Api.Entities.Category", b =>
                {
                    b.HasOne("SkillPath.Api.Entities.Category", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");
                });
        }
    }
}

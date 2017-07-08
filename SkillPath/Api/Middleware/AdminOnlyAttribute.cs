using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

public class AdminOnlyAttribute : AuthorizeAttribute {


    // protected override bool AuthorizeCore(HttpContext content) {
        
    // }
    //  protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminOnlyAttribute admin)
    //     {
    //         if (!context.User.HasClaim(c => c.Type == ClaimTypes.DateOfBirth))
    //         {
    //             context.User.
    //             context.Fail();
    //             return;
    //         }

    //         var dateOfBirth = Convert.ToDateTime(context.User.FindFirst(c => c.Type == ClaimTypes.DateOfBirth).Value);
    //         int age = DateTime.Today.Year - dateOfBirth.Year;
    //         if (dateOfBirth > DateTime.Today.AddYears(-age))
    //         {
    //             age--;
    //         }

    //         if (age >= 18)
    //         {
    //             context.Succeed(requirement);
    //         }
    //         else
    //         {
    //             context.Fail();
    //         }
    //     }
}

using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class LakeTrackerContext : DbContext
    {
        public LakeTrackerContext(DbContextOptions<LakeTrackerContext> options)
            : base(options)
        {
            
        }
    }
}
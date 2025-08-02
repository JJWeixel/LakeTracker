using System.Security.Claims;
using api.Logging;
using api.Data;
using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace api.Endpoints
{
    public abstract class BaseService
    {
        private readonly LakeTrackerContext _lakeTrackerDb;
        private readonly ClaimsPrincipal _principal;
        protected readonly ILogger<BaseService> _logger;
        private readonly IConfiguration _config;

        public LakeTrackerContext LakeTrackerDb => _lakeTrackerDb;
        public ILogger<BaseService> Logger => _logger;
        public IConfiguration Config => _config;
        public ClaimsPrincipal Principal => _principal;

        public BaseService(LakeTrackerContext lakeTrackerDb, ILogger<BaseService> logger, ClaimsPrincipal principal, IConfiguration config)
        {
            _lakeTrackerDb = lakeTrackerDb;
            _logger = logger;
            _principal = principal;
            _config = config;
        }
    }
}

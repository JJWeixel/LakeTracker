using api.Data;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using System.Security.Claims;

namespace api.Endpoints.Stations;

public class StationsServices : BaseService
{
	private readonly LakeTrackerContext _context;

	public StationsServices(
		LakeTrackerContext context,
		IConnectionMultiplexer redis,
		ILogger<StationsServices> logger,
		ClaimsPrincipal principal,
		IConfiguration config)
		: base(context, redis, logger, principal, config)
	{
		_context = context;
	}

	public async Task<ICollection<Domain.Station>> GetStations()
	{
		return await _context.Stations
			.AsNoTracking()
			.OrderBy(station => station.RegionLabel)
			.ToListAsync();
	}

	public async Task<ICollection<Domain.Station>> GetCurrentStations(int stationId)
	{
		var station = await _context.Stations
			.AsNoTracking()
			.Where(currentStation => currentStation.Id == stationId)
			.ToListAsync();

		return station;
	}
}

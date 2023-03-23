import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics')
@Controller({path: 'analytics', version: '1'})
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}


  
  @ApiOperation({ summary: 'Get analytics' })
  @ApiOkResponse({ description: 'Return Analytics' })
  @Get()
  analytics() {
    return this.analyticsService.findAll();
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class GetMovieInsightsDto {
  @ApiProperty({ example: 'Oppenheimer', required: true })
  movieName: string;
}

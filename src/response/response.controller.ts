import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ResponseService } from './response.service';
import { Response } from 'express';
import { CreateResponseDTO } from './DTO/create-response.dto';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Get()
  welcome() {
    return 'Welcome response';
  }

  @Post('/createResponse')
  async createResponse(@Body() body: CreateResponseDTO, @Res() res: Response) {
    try {
      const newResponse = await this.responseService.createResponse(body);
      res.status(HttpStatus.OK).json({
        message: 'Create response successfully',
        data: newResponse,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}

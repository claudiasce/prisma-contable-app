import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxyProvider } from '../../../common/proxy.provider';
import { RabbitMQ } from '../../../common/constants';
import { CatalogMsg } from '../common/constants';
import {
  CatalogByIdDto,
  CatalogDto,
  CatalogFindDto,
  CatalogGetDto,
} from '../dto/catalog.dto';
import { RequirePermissions } from '../../../common/decorators/require-permissions.decorator';

@ApiTags('Inventory | Catalog')
@ApiBearerAuth()
@Controller('catalog')
export class CatalogController {
  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}

  private _mainProxy = this.clientProxyProvider.clientProxyConfig(
    RabbitMQ().InventoryQueue,
  );

  @Post('findAll')
  @RequirePermissions(`inventory:catalog:findAll`)
  async findAll(@Body() filters: CatalogFindDto, @Req() req: any) {
    try {
      const creatorId = req.user.sub;
      const idCompany = req.user.company.sub;
      return this._mainProxy.send(CatalogMsg.FIND_ALL, {
        filters,
        creatorId,
        idCompany,
      });
    } catch (error) {
      console.error(error, 'Error at Execute [findAll]');
      return new NotFoundException({}, 'Error at Execute [findAll]');
    }
  }

  @Post('getAll')
  @RequirePermissions(`inventory:catalog:getAll`)
  async getAll(@Body() filters: CatalogGetDto, @Req() req: any) {
    try {
      const creatorId = req.user.sub;
      const idCompany = req.user.company.sub;
      return this._mainProxy.send(CatalogMsg.GET_ALL, {
        filters,
        creatorId,
        idCompany,
      });
    } catch (error) {
      console.error(error, 'Error at Execute [getAll]');
      return new NotFoundException({}, 'Error at Execute [getAll]');
    }
  }

  @Get('findOne')
  @RequirePermissions(`inventory:catalog:findOne`)
  async findOne(@Query() filters: CatalogGetDto, @Req() req: any) {
    try {
      const creatorId = req.user.sub;
      const idCompany = req.user.company.sub;
      return this._mainProxy.send(CatalogMsg.FIND_ONE, {
        filters,
        creatorId,
        idCompany,
      });
    } catch (error) {
      console.error(error, 'Error at Execute [findOne]');
      return new NotFoundException({}, 'Error at Execute [findOne]');
    }
  }

  @Get('findById/:id')
  @RequirePermissions(`inventory:catalog:findById`)
  async findById(@Param() filters: CatalogByIdDto, @Req() req: any) {
    try {
      const creatorId = req.user.sub;
      const idCompany = req.user.company.sub;
      return this._mainProxy.send(CatalogMsg.FIND_BY_ID, {
        filters,
        creatorId,
        idCompany,
      });
    } catch (error) {
      console.error(error, 'Error at Execute [findById]');
      return new NotFoundException({}, 'Error at Execute [findById]');
    }
  }

  @Post('createOrUpdate')
  @RequirePermissions(`inventory:catalog:createOrUpdate`)
  async createOrUpdate(@Body() model: CatalogDto, @Req() req: any) {
    try {
      console.log(model, 'model');
      const creatorId = req.user.sub;
      const idCompany = req.user.company.sub;
      return this._mainProxy.send(CatalogMsg.CREATE_OR_UPDATE, {
        ...model,
        creatorId,
        idCompany,
      });
    } catch (error) {
      console.error(error, 'Error at Execute [createOrUpdate]');
      return new InternalServerErrorException(
        {},
        'Error at Execute [createOrUpdate]',
      );
    }
  }

  @Delete('inactivate/:id')
  @RequirePermissions(`inventory:catalog:inactivate`)
  async inactivate(@Param() model: CatalogByIdDto, @Req() req: any) {
    try {
      const creatorId = req.user.sub;
      const idCompany = req.user.company.sub;
      return this._mainProxy.send(CatalogMsg.INACTIVATE, {
        ...model,
        creatorId,
        idCompany,
      });
    } catch (error) {
      console.error(error, 'Error at Execute [inactivate]');
      return new InternalServerErrorException(
        {},
        'Error at Execute [inactivate]',
      );
    }
  }

  @Delete('remove/:id')
  @RequirePermissions(`inventory:catalog:remove`)
  async remove(@Param() model: CatalogByIdDto, @Req() req: any) {
    try {
      const creatorId = req.user.sub;
      const idCompany = req.user.company.sub;
      return this._mainProxy.send(CatalogMsg.INACTIVATE, {
        ...model,
        creatorId,
        idCompany,
      });
    } catch (error) {
      console.error(error, 'Error at Execute [remove]');
      return new InternalServerErrorException({}, 'Error at Execute [remove]');
    }
  }
}

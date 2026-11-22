import { Configs, CatalogMsg } from '../../common/constants';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { Body, Controller } from '@nestjs/common';
import { CatalogService } from '../services/catalog.service';
import { UtilLib } from '../../common/libs/util.lib';

@Controller()
export class CatalogController {
  config: any;
  constructor(
    private serviceContext: CatalogService,
    private readonly utilLib: UtilLib,
  ) {
    this.config = Configs();
  }

  @MessagePattern(CatalogMsg.FIND_ALL)
  async findAll(@Body() data: any) {
    try {
      const { whereModel, take, skip, sortDirection, sortColumn, idCompany } =
        this.utilLib.filterBuilder(data);

      return this.serviceContext.findAll(
        {
          whereModel,
          take,
          skip,
          sortDirection,
          sortColumn,
        },
        idCompany,
      );
    } catch (e) {
      console.error(e, 'Error executing [FIND_ALL_CATALOG_REFERENCE]');
      throw new RpcException(e);
    }
  }

  @MessagePattern(CatalogMsg.GET_ALL)
  async getAll(@Body() data: any) {
    try {
      console.log(data, 'hey');
      const { whereModel, sortDirection, sortColumn, take } =
        this.utilLib.filterBuilder(data);
      return await this.serviceContext.getAll({
        whereModel,
        sortDirection,
        sortColumn,
        take,
      });
    } catch (e) {
      console.error(e, 'Error executing [GET_ALL_CATALOG]');
      throw new RpcException(e);
    }
  }

  @MessagePattern(CatalogMsg.FIND_ONE)
  async findOne(@Body() data: any) {
    try {
      const { whereModel } = this.utilLib.filterBuilder(data);
      return await this.serviceContext.findOne(whereModel);
    } catch (e) {
      console.error(e, 'Error executing [FIND_ONE_CATALOG]');
      throw new RpcException(e);
    }
  }

  @MessagePattern(CatalogMsg.FIND_BY_ID)
  async findById(@Body() { id }: any) {
    try {
      return await this.serviceContext.findById(id);
    } catch (e) {
      console.error(e, 'Error executing [FIND_BY_ID_CATALOG]');
      throw new RpcException(e);
    }
  }

  @MessagePattern(CatalogMsg.CREATE_OR_UPDATE)
  async createOrUpdate(@Body() data: any) {
    try {
      return await this.serviceContext.createOrUpdate(data);
    } catch (e) {
      console.error(e, 'Error executing [CREATE_OR_UPDATE_CATALOG]');
      throw new RpcException(e);
    }
  }

  @MessagePattern(CatalogMsg.CREATE_OR_UPDATE)
  async update(@Body() data: any) {
    try {
      return await this.serviceContext.createOrUpdate({ id: data.id, ...data });
    } catch (e) {
      console.error(e, 'Error executing [UPDATE_CATALOG]');
      throw new RpcException(e);
    }
  }

  @MessagePattern(CatalogMsg.INACTIVATE)
  async inactivate(@Body() data: any) {
    try {
      return await this.serviceContext.inactivate(data.id);
    } catch (e) {
      console.error(e, 'Error executing [INACTIVATE_CATALOG]');
      throw new RpcException(e);
    }
  }
}

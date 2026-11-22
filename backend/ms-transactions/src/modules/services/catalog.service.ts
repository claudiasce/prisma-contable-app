import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ProviderProxyServices } from '../../common/proxy/provider.proxy';
import { UtilLib } from '../../common/libs/util.lib';
import { v4 as uuidv4 } from 'uuid';
import { CatalogEntity } from 'src/common/entities/catalog.entity';


@Injectable()
export class CatalogService {
  relations = ['catalog', 'company', 'creator', 'updater'];
  equalCodes = ['id', 'type', 'code', 'idCompany', 'idCatalog'];

  constructor(
    private readonly providerProxy: ProviderProxyServices,
    private readonly utilLib: UtilLib,
    @InjectRepository(CatalogEntity)
    private catalogEntityRepository: Repository<CatalogEntity>,
  ) {}
  /*Para Conectar con otro micro-servicio*/
  private _providerProxy = this.providerProxy.providerProxy();

  async findAll({ whereModel, take, skip }: any, idCompany?: string) {
    try {
      const lib = new UtilLib();
      const where = lib.whereBuilder({
        whereModel,
        codes: this.equalCodes,
      });
      const result = await this.catalogEntityRepository.findAndCount({
        where: {
          ...where,
          idCompany,
          state: 1,
        },
        take,
        skip,
        relations: this.relations,
      });
      return this.utilLib.resultTransformer(result);
    } catch (e) {
      return this.handleError(e, 'findAll');
    }
  }

  async getAll({ whereModel, take, skip }: any, idCompany?: string) {
    try {
      const lib = new UtilLib();
      const where = lib.whereBuilder({
        whereModel,
        codes: ['id'],
      });
      return await this.catalogEntityRepository.find({
        where: {
          ...where,
          idCompany,
          state: 1,
        },
        take,
        skip,
        relations: ['company'],
      });
    } catch (e) {
      return this.handleError(e, 'getAll');
    }
  }

  async findOne({ whereModel }: any, idCompany?: string) {
    try {
      const lib = new UtilLib();
      const where = lib.whereBuilder({
        whereModel,
        codes: ['id'],
      });
      return await this.catalogEntityRepository.findOne({
        where: {
          ...where,
          idCompany,
          state: 1,
        },
        relations: ['company'],
      });
    } catch (e) {
      return this.handleError(e, 'findOne');
    }
  }

  async findById(id: string, idCompany?: string) {
    try {
      return await this.catalogEntityRepository.findOne({
        where: { id, idCompany, state: 1 },
        relations: ['company'],
      });
    } catch (e) {
      return this.handleError(e, 'findAll');
    }
  }

  async createOrUpdate(catalogDto: any) {
    try {
      let model;
      const exist = await this.catalogEntityRepository.findOne({
        where: { id: catalogDto.id ? catalogDto.id : IsNull() },
      });
      console.log(exist, 'exist');
      if (exist) {
        catalogDto.updatedAt = this.utilLib.getNowStringDate();
        model = await this.catalogEntityRepository.update(
          { id: catalogDto.id },
          catalogDto,
        );
      } else {
        catalogDto.createdAt = this.utilLib.getNowStringDate();
        catalogDto.code = uuidv4();
        catalogDto.details = catalogDto.details ? catalogDto.details : {};
        model = await this.catalogEntityRepository.save(catalogDto);
      }
      return model;
    } catch (e) {
      return this.handleError(e, 'createOrUpdate');
    }
  }

  async inactivate(id: string) {
    try {
      return await this.catalogEntityRepository.delete({ id });
    } catch (e) {
      return this.handleError(e, 'inactivate');
    }
  }

  handleError(e: any, funcName: string) {
    Logger.error(e?.message, `ERROR - ${funcName}`);
    return new InternalServerErrorException(
      { message: 'ERROR OCCURRED' },
      `ERROR [${funcName}]`,
    );
  }
}

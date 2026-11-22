import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'catalog' })
@Index(['idCompany', 'code'], { unique: true })
export class CatalogEntity {
  @Column({
    name: 'id',
    type: 'varchar',
    length: 60,
    unique: true,
    nullable: false,
  })
  id: string;

  @PrimaryColumn({
    name: 'id_company',
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  idCompany: string;

  @Column({ name: 'id_catalog', type: 'varchar', length: 60, nullable: true })
  idCatalog: string;

  @PrimaryColumn({ name: 'code', type: 'varchar', length: 60, nullable: false })
  code: string;

  @Column({ name: 'type', type: 'varchar', length: 60, nullable: false })
  type: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 150, nullable: true })
  description: string;

  @Column({ name: 'config', type: 'json', nullable: false })
  config: Record<string, any>;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column({ name: 'creator_id', type: 'varchar', length: 60, nullable: false })
  creatorId: string;

  @Column({ name: 'updater_id', type: 'varchar', length: 60, nullable: true })
  updaterId: string;

  @Column({ name: 'state', type: 'tinyint', nullable: false, default: 1 })
  state: number;

  // Self-referencing relation (parent catalog)
  @ManyToOne(() => CatalogEntity, { nullable: true })
  @JoinColumn({ name: 'id_catalog', referencedColumnName: 'id' })
  catalog: CatalogEntity;

  constructor(model?: Partial<CatalogEntity>) {
    if (model) Object.assign(this, model);
  }
}

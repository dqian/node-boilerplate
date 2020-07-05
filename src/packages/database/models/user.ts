// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp, getConnection } from 'typeorm'
import config from '~/config'

@Entity(`${config.DB.MAIN_SCHEMA}.users`)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string

  @Column('varchar')
  public email: string

  @Column('varchar')
  public password_hash: string

  @Column('timestamp with time zone')
  public created_at: Timestamp

  @Column('timestamp with time zone')
  public updated_at: Timestamp

  @Column('timestamp with time zone')
  public deleted_at: Timestamp
}
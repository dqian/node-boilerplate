// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import config from '~/config'

export interface IUserInfo {
  id: string
  email: string
}

@Entity(`${config.DB.MAIN_SCHEMA}.users`)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string

  @Column({ type: "varchar", length: 255, unique: true })
  public email: string

  @Column({ name: "password_hash", type: "varchar", length: 255 })
  public passwordHash: string

  @CreateDateColumn({ name: "created_at" })
  public createdAt: Timestamp

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Timestamp

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt: Timestamp

  public info(): IUserInfo {
    return {
      id: this.id,
      email: this.email,
    }
  }
}
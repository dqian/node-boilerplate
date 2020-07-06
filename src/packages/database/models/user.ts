// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp, getConnection, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import config from '~/config'

@Entity(`${config.DB.MAIN_SCHEMA}.users`)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string

  @Column({ type: "varchar", length: 255, unique: true })
  public email: string

  @Column({ type: "varchar", length: 255 })
  public password_hash: string

  @CreateDateColumn()
  public created_at: Timestamp

  @UpdateDateColumn()
  public updated_at: Timestamp

  @DeleteDateColumn()
  public deleted_at: Timestamp

  public info() {
    return {
      id: this.id,
      email: this.email,
    }
  }
}
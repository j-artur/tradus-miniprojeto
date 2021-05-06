import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export interface IUser {
	email: string
	name: string
	password: string
	isConfirmed?: boolean
	isAdmin?: boolean
}

@Entity()
export class User extends BaseEntity implements IUser {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	email: string

	@Column()
	name: string

	@Column({ select: false })
	password: string

	@Column({ default: false })
	isConfirmed: boolean

	@Column({ default: false })
	isAdmin: boolean

	@Column({ nullable: true, select: false })
	confirmationToken?: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}

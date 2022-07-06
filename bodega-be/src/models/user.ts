import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BeforeInsert, OneToMany, ManyToOne } from "typeorm";
import { UserType } from "./userType";
import bcrypt  from "bcryptjs";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    typeId: number;

    @ManyToOne(() => UserType)
    type: UserType;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
    }

}
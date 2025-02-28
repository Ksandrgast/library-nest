import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Books {

    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    @Field()
    @Index()
    @Column()
    title: string;

    @Field(() => [String])
    @Index({
        spatial: false,
    })
    @Column("text", {array: true})
    authors: string[];

    @Field()
    @Column()
    description: string;

    @Field(() => Int)
    @Column()
    year: number;

    @Field(() => Int)
    @Column()
    pages: number;

    @Field(() => Int)
    @Column()
    quantity: number;

    @Field()
    @Column()
    publisher: string;

    // @Field(() => Object)
    // @Column({
    //     type: 'jsonb',
    // })
    // bookAdditionalInfo: Record<string, string>;
    //
    // @Field(() => Object)
    // @Column({
    //     type: 'jsonb',
    // })
    // location: Record<string, string>;
}

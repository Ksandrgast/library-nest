import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class CreateBookRequestDto {

    @Field()
    title: string;

    @Field(() => [String])
    authors: string[];

    @Field()
    description: string;

    @Field(() => Int)
    year: number;

    @Field(() => Int)
    pages: number;

    @Field(() => Int)
    quantity: number;

    @Field()
    publisher: string;

    // @Field(() => Object)
    // bookAdditionalInfo: Record<string, string>;
    //
    // @Field(() => Object)
    // location: Record<string, string>;
}

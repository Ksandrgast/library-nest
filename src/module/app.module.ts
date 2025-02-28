import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "./user.module";
import {BooksModule} from "./books.module";
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'pwd',
            database: 'library',
            autoLoadEntities: true,
            synchronize: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Генерация файла схемы
            playground: true, // Включение GraphQL Playground
        }),
        UsersModule,
        BooksModule,
    ],
})

export class AppModule {
}

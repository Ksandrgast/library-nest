import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users.module";
import { BooksModule } from "./books.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Подключаем поддержку .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>("DB_SYNC") || false, // Лучше отключить в проде
      }),
    }),
    UsersModule,
    BooksModule,
  ],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users.module";
import { BooksModule } from "./books.module";

@Module({
  imports: [
    // Загружаем переменные окружения из .env
    ConfigModule.forRoot({ isGlobal: true }),

    // Настройка TypeORM с использованием переменных из .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST", "localhost"),
        port: configService.get<number>("DB_PORT", 5432),
        username: configService.get<string>("DB_USERNAME", "postgres"),
        password: configService.get<string>("DB_PASSWORD", "pwd"),
        database: configService.get<string>("DB_NAME", "library"),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>("DB_SYNC"), // В проде выключаем
      }),
    }),
    UsersModule,
    BooksModule,
  ],
})
export class AppModule {}

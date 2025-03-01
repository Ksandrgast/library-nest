import { NestFactory } from "@nestjs/core";
import { AppModule } from "./module/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CustomExceptionHandler } from "./errors/filter/custom-exception.handler";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("The API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalFilters(new CustomExceptionHandler());
  SwaggerModule.setup("/swagger-ui/index.html", app, document);

  await app.listen(8080).then(() => {
    console.log("Server is running on http://localhost:8080");
  });
}

bootstrap();

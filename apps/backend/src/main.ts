import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  // Allow the Next.js dev server (http://localhost:3000) to call this API
  app.enableCors({
    origin: ["http://localhost:3000"],
    credentials: false
  });

  await app.listen(4000);
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:4000/api/health`);
}

bootstrap();



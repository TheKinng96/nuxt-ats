import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Infrastructure
import { PrismaModule } from './infrastructure/database/prisma.module';

// Feature Modules
import { CandidatesModule } from './modules/candidates/candidates.module';

@Module({
  imports: [
    // Configuration - loads .env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env', // Root .env file
    }),

    // Cache - for token validation caching
    CacheModule.register({
      isGlobal: true,
      ttl: 600000, // 10 minutes default TTL
    }),

    // Database
    PrismaModule,

    // Feature Modules
    CandidatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './controllers/tasks/tasks.module';
import { UsersModule } from './controllers/users/users.module';

@Module({
  imports: [UsersModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

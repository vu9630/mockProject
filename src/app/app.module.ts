import { ArticleModule } from './article/article.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserModule } from './user/user.module';
import { ExitFormGuard } from './guard/exit-form.guard';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FeedModule,
    UserModule,
    AuthModule,
    ArticleModule,
  ],
  providers: [ExitFormGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

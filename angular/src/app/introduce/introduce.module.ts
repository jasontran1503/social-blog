import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroduceComponent } from './introduce.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '', component: IntroduceComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { animation: 'home' } },
      { path: 'about-me', component: AboutMeComponent, data: { animation: 'about-me' } },
      { path: 'skills', component: SkillsComponent, data: { animation: 'skills' } },
      { path: 'experience', component: ExperienceComponent, data: { animation: 'experience' } },
      { path: 'contact', component: ContactComponent, data: { animation: 'contact' } },
    ]
  }
];

@NgModule({
  declarations: [IntroduceComponent, HomeComponent, AboutMeComponent, SkillsComponent, ExperienceComponent, ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IntroduceModule { }

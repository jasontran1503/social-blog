import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  displayButtonChat = false;
  @ViewChild('chatComponent', { read: ViewContainerRef, static: true })
  containerRef: ViewContainerRef;
  toggleDisplayChat = false;

  constructor(private router: Router, private cfr: ComponentFactoryResolver) {
    let currentRoute = '';
    this.router.events
      .subscribe((event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          currentRoute = event.url;
          if (currentRoute && (currentRoute.startsWith('/introduce') || currentRoute === '/')) {
            this.displayButtonChat = false;
            this.clearChatBox();
          } else {
            this.displayButtonChat = true;
            this.toggleDisplayChat = false;
          }
        }
      });
  }

  ngOnInit(): void { }

  /**
   * Open chat box
   */
  async openChatBox() {
    this.toggleDisplayChat = !this.toggleDisplayChat;
    if (this.toggleDisplayChat) {
      const { ChatComponent } = await import('../app/chat/chat.component');
      const componentFactory = this.cfr.resolveComponentFactory(
        ChatComponent
      );
      const componentRef = this.containerRef.createComponent(componentFactory);
    } else {
      this.clearChatBox();
    }
  }

  /**
   * Close chat box
   */
  clearChatBox() {
    this.containerRef.clear();
  }
}

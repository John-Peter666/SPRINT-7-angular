import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContatoComponent } from './chat-contato.component';

describe('ChatContatoComponent', () => {
  let component: ChatContatoComponent;
  let fixture: ComponentFixture<ChatContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatContatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTodoComponent } from './template-todo.component';

describe('TemplateTodoComponent', () => {
  let component: TemplateTodoComponent;
  let fixture: ComponentFixture<TemplateTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateTodoComponent]
    });
    fixture = TestBed.createComponent(TemplateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

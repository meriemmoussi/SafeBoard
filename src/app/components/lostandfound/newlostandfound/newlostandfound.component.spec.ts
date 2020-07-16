import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlostandfoundComponent } from './newlostandfound.component';

describe('NewlostandfoundComponent', () => {
  let component: NewlostandfoundComponent;
  let fixture: ComponentFixture<NewlostandfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlostandfoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlostandfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
